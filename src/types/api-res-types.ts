export interface ListResponseType {
   name: string 
}
export interface ListType {
   id: string,
   name: string 
}
export interface ClientType {
   'name': string| null,
   'phone': string | null,
   'cars' : any[],
   '_id'?: string
}
// export interface Cars {
//    plate : {
//       'make': string,
//       'model': string,
//       'vin': string,
//    }
   
// }
// export interface Cars {
//    plate : {
//       'make': string,
//       'model': string,
//       'vin': string,
//    }
   
// }