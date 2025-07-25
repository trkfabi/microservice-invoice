/**
 * IDOtro
 * @targetNSAlias `sf`
 * @targetNamespace `https://www2.agenciatributaria.gob.es/static_files/common/internet/dep/aplicaciones/es/aeat/tike/cont/ws/SuministroInformacion.xsd`
 */
import { TipoIdentificacion } from "../../../types/enums";

export interface IdOtro {
  /** CountryType2|string|AF,AL,DE,AD,AO,AI,AQ,AG,SA,DZ,AR,AM,AW,AU,AT,AZ,BS,BH,BD,BB,BE,BZ,BJ,BM,BY,BO,BA,BW,BV,BR,BN,BG,BF,BI,BT,CV,KY,KH,CM,CA,CF,CC,CO,KM,CG,CD,CK,KP,KR,CI,CR,HR,CU,TD,CZ,CL,CN,CY,CW,DK,DM,DO,EC,EG,AE,ER,SK,SI,ES,US,EE,ET,FO,PH,FI,FJ,FR,GA,GM,GE,GS,GH,GI,GD,GR,GL,GU,GT,GG,GN,GQ,GW,GY,HT,HM,HN,HK,HU,IN,ID,IR,IQ,IE,IM,IS,IL,IT,JM,JP,JE,JO,KZ,KE,KG,KI,KW,LA,LS,LV,LB,LR,LY,LI,LT,LU,XG,MO,MK,MG,MY,MW,MV,ML,MT,FK,MP,MA,MH,MU,MR,YT,UM,MX,FM,MD,MC,MN,ME,MS,MZ,MM,NA,NR,CX,NP,NI,NE,NG,NU,NF,NO,NC,NZ,IO,OM,NL,BQ,PK,PW,PA,PG,PY,PE,PN,PF,PL,PT,PR,QA,GB,RW,RO,RU,SB,SV,WS,AS,KN,SM,SX,PM,VC,SH,LC,ST,SN,RS,SC,SL,SG,SY,SO,LK,SZ,ZA,SD,SS,SE,CH,SR,TH,TW,TZ,TJ,PS,TF,TL,TG,TK,TO,TT,TN,TC,TM,TR,TV,UA,UG,UY,UZ,VU,VA,VE,VN,VG,VI,WF,YE,DJ,ZM,ZW,QU,XB,XU,XN */
  CodigoPais?: string;
  /** PersonaFisicaJuridicaIDTypeType|string|02,03,04,05,06,07 */
  IDType: TipoIdentificacion;
  /** TextMax20Type|string|maxLength */
  ID: string;
}
