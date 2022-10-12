export const soporte = {
  tipoDocumentoProveedor: 'TDP',
  tipoProveedor: 'TPV',
  categoriaProducto: 'CTP',
  cargoEmpleado: 'CEM',
  estadoComprobanteElectronico: 'ECE',
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
    tipoCambio: 'Tipo de cambio',
    cuentaContable: 'Cuenta contable',
    subCuentaContable: 'Sub cuenta contable',
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
  cuentaContable: 'cuentacontables',
  subCuentaContable: 'subcuentacontables',
  tipoCambio: 'tipocambios',
  moneda: 'monedas',
  auditoria: 'auditorias',
};

export const accion_mensaje = {
  modificar_valor_ingresado: 'Modificar valor ingresado',
  modificar_valor_selecionado: 'Modificar valor seleccionado',
  error_tecnico: 'Comunicarse con soport TI',
  registro_correcto: 'Ok',
  listado_vacio: 'No hay registros con los filtros seleccionados',
  faltan_datos: 'No ha ingresado/seleccionado los datos requeridos',
  agregar_valor_ingresado_seleccionado:
    'Agregar/seleccionar valores requeridos',
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
  tipo_cambio: {
    no_existe: 'no existe',
    inactivo: 'inactivo',
    no_registrados: 'No hay tipos de cambio registrados',
    fecha_emision_no_valida:
      'No hay tipo de cambio registrado para la fecha de emisión',
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

export const auditoriaLog = {
  opciones: {
    login: 'Login',
    comprobantes_agregar: 'Agregar comprobante',
    comprobante_cargar:'Cargar comprobante',
    comprobante_reporte:'Reporte comprobantes',
    comprobante_listar:'Listar comprobantes',
    comprobante_plantilla_agregar:'Agregar plantilla ',
    comprobante_plantilla_listar: 'Listar plantilla'
  },
  procesos: {
    acceso: 'Acceder al sistema',
    guardar: 'Guardar',
    actualiar: 'Actualizar',
    eliminar: 'Eliminar',
    consultar: 'Consultar', 
    listar: 'Listar',
    generar: 'Generar',
    descargar:'Descargar'
  },
};
