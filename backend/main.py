from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np
import pandas as pd
import logging
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import LabelEncoder
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from var import Incoming, Outgoing, FEATURES, ModelEnum

app = FastAPI()
logging.basicConfig(level=logging.ERROR)
logger = logging.getLogger(__name__)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def index():
    return {
        "message": "Hi bro 😭"
    }

@app.post("/predict", response_model=Outgoing)
async def predict(request: Incoming):
    try:
        input_data = request.model_dump()
        input_data.pop("model")
        input_df = pd.DataFrame([input_data])
        
        missing_cols = set(FEATURES) - set(input_df.columns)
        if missing_cols:
            raise HTTPException(status_code=400, detail=f"Missing columns: {missing_cols}")
        input_df = input_df[FEATURES]

        nan_count = input_df.isna().sum().sum()
        if nan_count > len(FEATURES) * 0.5:
            raise HTTPException(status_code=400, detail="Too many missing values")

        nn = joblib.load("pkl/NearestNeighbour2.pkl")
        le = joblib.load("pkl/LabelEncoding.pkl")
        train = joblib.load("pkl/NonNullX.pkl")
        imputer = joblib.load("pkl/SimpleImputer.pkl")

        input_df_filled = imputer.transform(input_df)
        distances, indices = nn.kneighbors(input_df_filled, n_neighbors=2)   
        del input_df_filled     
        similar_records = train[indices[0]]
        
        neighbor = [
            f"Record {i+1} (Distance: {dist:.4f}): {np.round(record, 2).tolist()}" 
            for i, (record, dist) in enumerate(zip(similar_records, distances[0]))
        ]
        print(len(input_df.columns.to_list()))

        match request.model:
            case ModelEnum.XGB:
                model = joblib.load("pkl/XGBoostPipe.pkl")
            case ModelEnum.LGBM:
                model = joblib.load("pkl/LightGBMPipe.pkl")
            case ModelEnum.CM:
                model = joblib.load("pkl/CatBoostPipe.pkl")
            case ModelEnum.VC:
                model = joblib.load("pkl/VotingClassifierPipe.pkl")
            case _:
                raise HTTPException(status_code=400, detail="Invalid model type")

        return same_task(model, input_df, le, neighbor)

    except Exception as e:
        logger.error(f"Error in /predict: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

def same_task(model, input_df, le, neighbor) -> Outgoing:
    try:
        
        input_preprocessed = model.named_steps['preprocessing'].transform(input_df)        
        classifier = model.named_steps['model']
        pred = classifier.predict(input_preprocessed)[0]
        pred = le.inverse_transform([pred])[0]
        conf = classifier.predict_proba(input_preprocessed).max()

        return Outgoing(
            success=True,
            prediction=pred,
            confidence=f"{conf:.4f}",
            neighbor=neighbor
        )
    except Exception as e:
        logger.error(f"Error in same_task: {str(e)}")
        import traceback
        traceback.print_exc()  # Print full traceback
        raise HTTPException(status_code=500, detail="Server error")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=9000)