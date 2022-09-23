export const soporte = {
  tipoDocumentoProveedor: 'TDP',
  tipoProveedor: 'TPV',
  categoriaProducto: 'CTP',
  cargoEmpleado: 'CEM',
};

export const filters = {
  placeholders: {
    comprobante: 'Comprobante electrónico',
    proveedor: 'Proveedor',
    tipoDocumento: 'Tipo de documento',
    producto: 'Producto',
    empleado: 'Empleado',
    formaPago: 'Forma de pago',
    usuario: 'Usuario',
    moneda: 'Moneda',
    plantilla: 'Plaantilla Excel',
  },
};

export const nombre_servicios = {
  soporte: 'soportes',
  proveedor: 'proveedores',
  producto: 'productos',
  modulo: 'modulos',
  formaPago: 'formapagos',
  tipoDocumento: 'tipodocumentos',
  empleado: 'empleados',
  usuario: 'usuarios',
  perfilUsuario: 'perfilusuarios',
  comprobante: 'comprobantes',
  plantilla: 'plantillas',
  detallePlantilla: 'detalleplantillas',
};

export const accion_mensaje = {
  modificar_valor_ingresado: 'modificar valor ingresado',
  modificar_valor_selecionado: 'modificar valor seleccionado',
  error_tecnico: 'Comunicarse con soport TI',
  registro_correcto: 'Ok',
};

export const nombre_empresa = 'Empresa logística';
export const estado_inicial = 'A';
export const contrasena_inicial = 'prueba@123';

export const validaciones_comprobantes = {
  nro_documento: {
    vacia: 'está vacío',
  },
  proveedor: {
    no_existe: 'no existe',
    inactivo: 'inactivo',
    no_registrados: 'No hay proveedores registrados',
    vacia: 'está vacío',
  },
  tipo_documento: {
    no_existe: 'no existe',
    inactivo: 'inactivo',
    no_registrados: 'No hay tipos de documento registrados',
    vacia: 'está vacío',
  },
  forma_pago: {
    no_existe: 'no existe',
    inactivo: 'inactivo',
    no_registrados: 'No hay formas de pago registrados',
    vacia: 'está vacía',
  },
  moneda: {
    no_existe: 'no existe',
    inactivo: 'inactivo',
    no_registrados: 'No hay monedas registradas',
    vacia: 'está vacía',
  },
  fecha: {
    no_valida: 'no válida',
    vacia: 'está vacía',
    formato_incorrecto: 'tiene formato incorrecto',
  },
  valor_numerico: {
    no_valida: 'no válido',
  },
};

export const plantilla_CONCAR = {
  nombre_archivo: 'PLANTILLA CONCAR EXCEL',
  campos: [
    [
      'Sub Diario',
      'Número de Comprobante',
      'Fecha de Comprobante',
      'Código de Moneda',
      'Glosa Principal',
      'Tipo de Cambio',
      'Tipo de Conversión',
      'Flag de Conversión de Moneda',
      'Fecha Tipo de Cambio',
      'Cuenta Contable',
      'Código de Anexo',
      'Código de Centro de Costo',
      'Debe / Haber',
      'Importe Original',
      'Importe en Dólares',
      'Importe en Soles',
      'Tipo de Documento',
      'Número de Documento',
      'Fecha de Documento',
      'Fecha de Vencimiento',
      'Código de Area,	Glosa Detalle',
      'Código de Anexo Auxiliar',
      'Medio de Pago',
      'Tipo de Documento de Referencia',
      'Número de Documento Referencia',
      'Fecha Documento Referencia',
      'Nro Máq. Registradora Tipo Doc. Ref.',
      ' Base Imponible Documento Referencia',
      'IGV Documento Provisión',
      'Tipo Referencia en estado MQ',
      'Número Serie Caja Registradora',
      'Fecha de Operación',
      'Tipo de Tasa',
      'Tasa Detracción/Percepción',
      'Importe Base Detracción/Percepción Dólares',
      'Importe Base Detracción/Percepción Soles',
      "Tipo Cambio para 'F'",
      'Importe de IGV sin derecho crédito fiscal',
    ],
  ],
};

export const reportes = {
  comprobante_electronico: {
    nombre: 'Reporte_Comprobantes',
    columnasAncho: [
      { wch: 15 },
      { wch: 15 },
      { wch: 13 },
      { wch: 50 },
      { wch: 10 },
      { wch: 20 },
      { wch: 21 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
    ],
  },
};
