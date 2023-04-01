export interface ProductData {
    components: (Product)[] | null;
  }
  export interface Product {
    InstallDate: string;
    ComponentOk: number;
    DeviceTypeHebrew: string;
    DeviceId: string;
    DeviceType: string;
    WebSiteDeviceName: string;
    LastReportDate: string;
    Picture?: string | null;
    ManufacturerName?: string | null;
    ReceptionLevel?: string | null;
  }
  