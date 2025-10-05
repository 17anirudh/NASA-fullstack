from pydantic import BaseModel, ConfigDict
from enum import Enum
from typing import Union

class ModelEnum(str, Enum):
    XGB = "XGBoost"
    LGBM = "LightGBM"
    CM = "CatBoost"
    VC = "VotingClassifier"

class Incoming(BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)
    
    koi_score: Union[float, int]
    koi_period: Union[float, int]
    koi_impact: Union[float, int]
    koi_duration: Union[float, int]
    koi_depth: Union[float, int]
    koi_prad: Union[float, int]
    koi_teq: Union[float, int]
    koi_max_sngle_ev: Union[float, int]
    koi_max_mult_ev: Union[float, int]
    koi_model_snr: Union[float, int]
    koi_count: Union[float, int]
    koi_num_transits: Union[float, int]
    koi_bin_oedp_sig: Union[float, int]
    koi_steff: Union[float, int]
    koi_slogg: Union[float, int]
    koi_srad: Union[float, int]
    koi_smass: Union[float, int]
    koi_kepmag: Union[float, int]
    koi_gmag: Union[float, int]
    koi_rmag: Union[float, int]
    koi_jmag: Union[float, int]
    koi_kmag: Union[float, int]
    koi_fwm_stat_sig: Union[float, int]
    koi_fwm_prao: Union[float, int]
    koi_fwm_pdeco: Union[float, int]
    koi_dicco_mra: Union[float, int]
    koi_dicco_msky: Union[float, int]
    koi_dikco_mra: Union[float, int]
    koi_dikco_msky: Union[float, int]
    model: ModelEnum

class Outgoing(BaseModel):
    success: bool
    prediction: str
    confidence: str
    neighbor: list[str]

FEATURES: list[str] = [
    "koi_score", "koi_period", "koi_impact", "koi_duration", "koi_depth", "koi_prad", "koi_teq", "koi_max_sngle_ev", 
    "koi_max_mult_ev", "koi_model_snr", "koi_count", "koi_num_transits", "koi_bin_oedp_sig", "koi_steff", "koi_slogg", 
    "koi_srad", "koi_smass", "koi_kepmag", "koi_gmag", "koi_rmag", "koi_jmag", "koi_kmag", "koi_fwm_stat_sig", 
    "koi_fwm_prao", "koi_fwm_pdeco", "koi_dicco_mra", "koi_dicco_msky", "koi_dikco_mra", "koi_dikco_msky"
]