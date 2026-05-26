// academyData.js
// Base de datos académica completa y robusta de los 7 capítulos del Manual de Bienes (GF-M-001 V.2).
// Libre de alucinaciones, extraído exclusivamente de manual.structured.md.

export const academyData = {
  "chapters": [
    {
      "id": 1,
      "num": "I",
      "title": "Marco Conceptual de los Bienes",
      "subtitle": "Fundamentos Teóricos, Clasificaciones e Intangibles",
      "header": {
        "purpose": "Establecer la doctrina y los conceptos rectores para identificar, clasificar e incorporar los activos tangibles e intangibles controlados por el Ministerio de Defensa Nacional de acuerdo con el Régimen de Contabilidad Pública.",
        "difficulty": "Intermedio",
        "competencies": [
          "Identificar la naturaleza de un activo y evaluar si cumple las condiciones normativas de control, evento pasado y potencial de servicio.",
          "Clasificar correctamente los bienes en tangibles (Inventarios, Propiedades, Planta y Equipo, Control Administrativo, Históricos y Culturales) e intangibles.",
          "Distinguir e incorporar transacciones contables afectadas por depreciación, deterioro, amortización y adiciones."
        ],
        "expectedResult": "Al finalizar, el estudiante podrá auditar el balance de cualquier unidad ejecutora, determinando si los bienes muebles, inmuebles o intangibles están correctamente catalogados bajo la normativa GF-M-001 V.2."
      },
      "objectives": {
        "general": "Unificar la base teórica y jurídica del manejo de bienes públicos del Ministerio de Defensa Nacional de conformidad con el Marco Normativo Contable aplicable para entidades de Gobierno.",
        "specifics": [
          "Definir el concepto de 'bien' y control logístico-contable en la plataforma SILOG.",
          "Analizar las diferencias entre inventarios para consumo y devolutivos de Propiedades, Planta y Equipo.",
          "Determinar las condiciones administrativas aplicables a bienes en bodega, en tránsito, no explotados y en mantenimiento."
        ],
        "procedural": "Aplicar la depreciación sistemática por línea recta, identificar indicios de deterioro en activos y documentar adiciones y mejoras.",
        "conceptual": "Diferenciar con precisión entre bienes devolutivos de PPYE y bienes de control administrativo de cuantía inferior a 50 UVT."
      },
      "map": {
        "mainTopic": "Marco Conceptual y Clasificación de Activos",
        "subtopics": [
          "Definición de Bien",
          "Bienes Tangibles",
          "Bienes Intangibles",
          "Conceptos Valuativos"
        ],
        "concepts": [
          "Activo controlado",
          "Bienes devolutivos",
          "Bienes en tránsito",
          "Deterioro",
          "Valor residual"
        ],
        "procedures": [
          "Cálculo de depreciación lineal",
          "Medición de adiciones y mejoras",
          "Registro sin efecto contable de bienes < 50 UVT"
        ],
        "documents": [
          "Catálogo General de Cuentas",
          "Política Contable No. 01 MDN",
          "Ficha técnica del activo"
        ],
        "actors": [
          "Almacenista general",
          "Jefe de Contabilidad",
          "Supervisor técnico",
          "Grupo SILOG"
        ],
        "controls": [
          "Umbral de 50 UVT para gasto y control logístico",
          "Revisión anual de deterioro",
          "Verificación de vidas útiles"
        ],
        "exceptions": [
          "Armamento, equipo de de comunicaciones operacionales y semovientes se consideran PPYE sin importar que su costo sea menor a 50 UVT"
        ]
      },
      "temario": [
        {
          "title": "1.1 Concepto de Bien y Control Técnico",
          "explanation": "El concepto de bien dentro del Ministerio de Defensa Nacional (MDN) de conformidad con el manual GF-M-001 V.2 representa todo artículo inventariable o activo (tanto de naturaleza tangible como intangible) controlado técnicamente por la entidad. Este control técnico-logístico es una obligación legal e institucional que se materializa y ejerce a través de la plataforma tecnológica del Sistema de Información Logístico (SILOG), el cual opera en constante comunicación, sincronización y enlace con el Sistema Integrado de Información Financiera (SIIF) Nación. Los bienes públicos del sector Defensa deben ser gestionados de forma tal que garanticen un potencial de servicio (apoyo operativo y logístico en misiones de seguridad y defensa) o beneficios económicos futuros, cumpliendo estrictamente con las directrices contables de la Contaduría General de la Nación (Resolución 533 de 2015). Ningún elemento puede ser incorporado o dado de baja de forma física o contable sin cumplir con los registros reglamentarios del sistema logístico unificado.",
          "concepts": [
            {
              "name": "Activo Controlado",
              "desc": "Recurso del cual la entidad tiene el poder de obtener el potencial de servicio o los beneficios económicos que proceden del mismo."
            },
            {
              "name": "SILOG",
              "desc": "Plataforma tecnológica unificada rectora para el registro, movimientos e inventario del Ministerio de Defensa."
            }
          ],
          "reference": "Capítulo I, Sección 1.1"
        },
        {
          "title": "1.2 Clasificación de Bienes Tangibles",
          "explanation": "Los bienes tangibles son aquellos activos que ocupan un espacio físico medible y poseen valor económico determinado por especificaciones técnicas oficiales. De acuerdo con el manual GF-M-001 V.2, se subdividen bajo una rigurosa estructura operativa:\n\n1. **Inventarios (Grupo 15 en contabilidad / Cuenta 8374)**: Comprende los bienes destinados a ser consumidos en el desarrollo de las operaciones de defensa, vendidos o distribuidos gratuitamente en cumplimiento de funciones misioneras. Incluye materias primas, materiales de intendencia en bodega, productos en proceso y suministros varios.\n\n2. **Propiedades, Planta y Equipo (PPYE - Cuenta 1635)**: Activos tangibles que posee la entidad para su uso en la producción o suministro de bienes, para la prestación de servicios, o para propósitos administrativos, cuya vida útil estimada es superior a doce (12) meses y no están destinados para la venta ordinaria.\n\n3. **Bienes con Control Administrativo**: Representan aquellos bienes muebles de cuantía inferior al umbral de cincuenta (50) Unidades de Valor Tributario (UVT) vigentes, que no se extinguen con el primer uso y que, por su naturaleza devolutiva, deben ser devueltos por el funcionario al término de su servicio. Contablemente se cargan al gasto en el periodo de adquisición, pero logísticamente mantienen un registro obligatorio en SILOG para control físico, seguridad y trazabilidad.\n\n**EXCEPCIONES ABSOLUTAS**: El armamento (material de guerra), los equipos de comunicaciones operacionales tácticas, y los semovientes (caninos y equinos) se consideran Propiedades, Planta y Equipo (PPYE) sin importar que su costo individual sea inferior al umbral de las 50 UVT, debido a su carácter misional y valor estratégico nacional.",
          "reference": "Capítulo I, Sección 1.2.1"
        },
        {
          "title": "1.3 Bienes Intangibles y Especiales",
          "explanation": "Los activos intangibles y las condiciones de control especial representan una parte crítica de la administración del patrimonio en el sector Defensa:\n\n1. **Bienes Intangibles**: Son recursos identificables, de carácter no monetario y sin apariencia física, controlados por la entidad para el cumplimiento de sus funciones misionales (con expectativa de vida útil mayor a 12 meses). Incluye patentes (con derecho de explotación limitado a 20 años de acuerdo con la legislación nacional), marcas, licencias técnicas y desarrollos de software especializados (como la propia plataforma SILOG). Los intangibles de bajo costo (< 50 UVT) se cargan directamente al gasto en el periodo de adquisición, pero se registran y controlan administrativamente a través de las oficinas de Tecnologías de la Información y las Comunicaciones (TICs) de la respectiva fuerza.\n\n2. **Bienes en Tránsito**: Aquellos elementos adquiridos que se encuentran en proceso de transporte físico, nacionalización o importación (bajo contratos internacionales o cláusulas OFFSET), los cuales ya son propiedad de la nación pero no han ingresado formalmente a las bodegas físicas de la unidad.\n\n3. **Bienes en Poder de Terceros**: Activos que pertenecen al MDN pero se encuentran bajo la tenencia temporal de otra entidad del Estado o de terceros bajo la modalidad de comodato, depósito o custodia externa formalizada mediante acto administrativo.\n\n4. **Bienes No Explotados**: Activos fijos que han sido devueltos a bodega, carecen de personal técnico para su operación, repuestos de recambio, o se encuentran a la espera de mantenimiento correctivo/preventivo. Estos bienes no pierden su condición de activo, pero requieren control de novedad en SILOG.",
          "reference": "Capítulo I, Sección 1.2.2 y 1.2.3"
        },
        {
          "title": "1.4 Conceptos que Afectan el Valor",
          "explanation": "El valor de los bienes del sector Defensa varía periódicamente debido a factores valuativos obligatorios regulados en el manual:\n\n1. **Depreciación**: Consiste en la distribución sistemática y racional del valor depreciable de un activo tangible a lo largo de su vida útil estimada. El cálculo estándar se realiza por el método de línea recta (Costo del activo - Valor Residual / Años de Vida Útil). El valor residual se considera cero (0) por defecto para PPYE en el MDN, salvo que exista una expectativa real y sustentada de venta o enajenación al término de su vida operativa. La depreciación inicia formalmente cuando el activo se encuentra listo y disponible en el lugar y condiciones necesarias para operar.\n\n2. **Deterioro**: Es el reconocimiento contable de la pérdida parcial imprevista en el potencial de servicio o beneficios económicos del activo, adicional a la depreciación normal. Se debe realizar una prueba anual para evaluar indicios de deterioro físico, tecnológico u obsolescencia militar.\n\n3. **Adiciones y Mejoras**: Inversiones y desembolsos capitalizables que aumentan de manera comprobada la capacidad productiva, eficiencia operativa, o prolongan la vida útil restante del activo fijo. Estos costos se cargan como un mayor valor del bien en los registros financieros, a diferencia de los gastos de mantenimiento preventivo y reparaciones ordinarias que se registran directamente al gasto del periodo.",
          "reference": "Capítulo I, Sección 1.3"
        }
      ],
      "resumen": {
        "purpose": "Impartir el marco doctrinario sobre la definición y valoración de bienes del sector Defensa.",
        "concepts": "Activos tangibles, intangibles, inventarios, PPYE, amortización, deterioro.",
        "procedures": "Reconocimiento patrimonial inicial, depreciación sistemática lineal, capitalización de adiciones.",
        "responsibilities": "El almacenista controla el inventario físico en bodega; el contador registra los hechos financieros del activo.",
        "documents": "Resolución 533 de 2015, Catálogo de Cuentas, Actas de Ingreso a Bodega.",
        "controls": "Fijación del umbral de 50 UVT para la clasificación contable de PPYE y control administrativo de bajo valor.",
        "mistakes": "Cometer el error de no registrar en SILOG bienes menores a 50 UVT (deben registrarse transaccionalmente sin efecto contable)."
      },
      "glosario": [
        {
          "term": "Bien",
          "definition": "Activo controlado resultante de eventos pasados con potencial de servicio.",
          "ref": "Sección 1.1"
        },
        {
          "term": "Vida Útil",
          "definition": "Periodo durante el cual se espera que un activo sea utilizable por la entidad.",
          "ref": "Sección 1.3.1"
        },
        {
          "term": "Control Administrativo",
          "definition": "Registro en SILOG sin efecto financiero para bienes menores a 50 UVT.",
          "ref": "Sección 1.2.1.3"
        },
        {
          "term": "Deterioro",
          "definition": "Pérdida parcial en el potencial de servicio de un activo.",
          "ref": "Sección 1.3.2"
        }
      ],
      "practica": {
        "context": "Auditoría Logística y Financiera en una Base Aérea",
        "scenario": "En el Comando Aéreo de Combate No. 5 se realiza una compra centralizada y local de diversos elementos. El Almacenista General y el Jefe de Contabilidad deben validar la correcta clasificación de los ingresos.",
        "data": "Elementos ingresados:\n1. 50 computadores portátiles comprados por $1.200.000 cada uno (UVT de referencia = $47.000).\n2. 5 fusiles de asalto para seguridad por $1.500.000 cada uno.\n3. 1 licencia de software operativo por valor de $1.800.000.\n4. Repuestos de helicóptero capitalizables por valor de $5.000.000.",
        "questions": [
          "¿Cómo deben clasificarse los portátiles de $1.200.000 si su valor es inferior a 50 UVT ($2.350.000)?",
          "¿Qué cuenta contable afecta el software de $1.800.000 si tiene vida útil mayor a un año?",
          "¿Por qué los fusiles de $1.500.000 se consideran PPYE a pesar de ser menores a 50 UVT?"
        ],
        "steps": [
          "Calcular el valor de 50 UVT para la vigencia fiscal ($47.000 * 50 = $2.350.000).",
          "Comparar el costo individual de cada activo con el umbral de 50 UVT.",
          "Aplicar las excepciones reglamentarias para armamento y software.",
          "Registrar en SILOG la entrada transaccional correspondiente."
        ],
        "criteria": "Clasificación correcta del 100% de los elementos e identificación adecuada de las excepciones para material de guerra.",
        "solution": "1. Computadores portátiles ($1.200.000 < 50 UVT): Se clasifican como Gasto en contabilidad, pero ingresan a SILOG bajo 'Bienes con Control Administrativo' (devolutivos de bajo valor).\n2. Software ($1.800.000 < 50 UVT): Al ser una licencia intangible de bajo costo, se reconoce como Gasto del periodo y se ingresa a Control Administrativo de TICs.\n3. Fusiles ($1.500.000): Aunque su valor es inferior a 50 UVT, el armamento es una excepción absoluta del manual y se reconoce contable y físicamente como Propiedades, Planta y Equipo (material de guerra).\n4. Repuestos capitalizables ($5.000.000): Mayor valor del activo de transporte aéreo, previa baja del componente sustituido."
      },
      "bancoPreguntas": [
        {
          "question": "¿Cómo se define conceptualmente un bien del Ministerio de Defensa de acuerdo con la norma GF-M-001 V.2?",
          "options": [
            "Un activo tangible propiedad exclusiva del estado con fines de enajenación inmediata.",
            "Todo artículo inventariable o activo tangible/intangible controlado por el MDN del cual se espera obtener potencial de servicio o beneficios económicos.",
            "Elementos consumibles que se agotan con el primer uso y carecen de control en la plataforma SILOG.",
            "Únicamente los terrenos y edificaciones registrados a nombre de la Finca Raíz militar."
          ],
          "correct": 1,
          "feedback": "El concepto de bien exige control, origen en evento pasado y expectativa de potencial de servicio o beneficio económico."
        },
        {
          "question": "¿Cuál es el umbral financiero que divide los bienes muebles de Propiedades, Planta y Equipo de los bienes con Control Administrativo?",
          "options": [
            "100 UVT",
            "50 UVT",
            "30 UVT",
            "10 UVT"
          ],
          "correct": 1,
          "feedback": "Los bienes muebles de cuantía inferior a 50 UVT se reconocen como gasto del periodo contable, pero mantienen control administrativo en SILOG."
        },
        {
          "question": "¿Cuál de los siguientes activos representa una excepción y se reconoce como PPYE sin importar su valor en UVT?",
          "options": [
            "Muebles y enseres de oficina",
            "Fusiles de asalto y material de guerra",
            "Software de ofimática general",
            "Útiles de aseo y cafetería"
          ],
          "correct": 1,
          "feedback": "El armamento, equipo reservado de de comunicaciones operacionales y semovientes son excepciones absolutas y siempre se reconocen como PPYE."
        },
        {
          "question": "El almacén virtual tiene como característica principal que:",
          "options": [
            "No requiere almacenista responsable ni controles de SILOG.",
            "Maneja inventario físico permanente de combustibles de aviación.",
            "Carece de estructura física y su saldo de existencias temporales debe tender a cero al final del periodo.",
            "Permite omitir la legalización de las transferencias internas."
          ],
          "correct": 2,
          "feedback": "El almacén virtual controla existencias temporales de adquisiciones centralizadas; su saldo de inventario final en SILOG debe ser cero."
        },
        {
          "question": "¿Cuándo inicia oficialmente el proceso de depreciación de un bien de propiedad del MDN?",
          "options": [
            "Al firmar el contrato con el proveedor internacional.",
            "Cuando el bien se registra en la Finca Raíz de la fuerza.",
            "Cuando el activo esté disponible para su uso, en la ubicación y condiciones necesarias para operar.",
            "Al finalizar la vida útil estimada del bien."
          ],
          "correct": 2,
          "feedback": "La depreciación inicia en el momento en que el activo se encuentra listo y disponible para prestar el servicio."
        },
        {
          "question": "¿Qué representa contablemente el concepto de 'Deterioro' en un activo?",
          "options": [
            "La distribución sistemática y periódica del costo del bien a lo largo de su vida útil.",
            "La pérdida parcial estimada del potencial de servicio del activo, adicional al reconocimiento de la depreciación.",
            "Las reparaciones preventivas bimensuales del equipo contra incendios.",
            "El mayor valor asignado por concepto de adiciones y mejoras."
          ],
          "correct": 1,
          "feedback": "El deterioro mide pérdidas imprevistas o excepcionales en la capacidad de servicio de un activo."
        },
        {
          "question": "¿Cuál es el valor residual estipulado por defecto para los bienes de Propiedad, Planta y Equipo en el Ministerio de Defensa?",
          "options": [
            "10% del costo del activo.",
            "Cero, a menos que exista expectativa de venta.",
            "50 UVT por elemento.",
            "Un salario mínimo legal vigente."
          ],
          "correct": 1,
          "feedback": "El valor residual se considera cero por defecto, dado que la entidad generalmente consume todo el potencial de servicio del activo."
        },
        {
          "question": "Los repuestos de helicópteros o aeronaves se capitalizan en el activo de PPYE siempre que:",
          "options": [
            "Se consuman en menos de un mes.",
            "Tengan un valor inferior a 10 UVT.",
            "Se utilicen durante más de 12 meses, previa baja del componente sustituido.",
            "Correspondan a elementos de carácter reservado con fines tácticos."
          ],
          "correct": 2,
          "feedback": "Los repuestos importantes con vida superior a un año se capitalizan previa baja en el sistema del componente desgastado."
        },
        {
          "question": "El software o programas de computación controlados por la entidad son:",
          "options": [
            "Bienes tangibles de inventario.",
            "Activos intangibles.",
            "Bienes de consumo para oficina.",
            "Bienes históricos nacionales."
          ],
          "correct": 1,
          "feedback": "El software es un recurso identificable, sin apariencia física y controlado por el MDN, por lo cual se clasifica como activo intangible."
        },
        {
          "question": "Un bien mueble en condición de 'No Explotado' representa:",
          "options": [
            "Bienes que están en aduana esperando nacionalizarse.",
            "Bienes usados devueltos a bodega, o con expectativa de mantenimiento que no se realiza por falta de recursos/técnicos.",
            "Terrenos del Ministerio sobre los que se construyen bases militares operativas.",
            "Bienes incautados en operativos militares en cuentas de orden."
          ],
          "correct": 1,
          "feedback": "Los bienes no explotados son activos devueltos o sin uso debido a falta de mantenimiento, repuestos o técnicos calificados."
        },
        {
          "question": "La 'Amortización' es el proceso análogo a la depreciación aplicado a:",
          "options": [
            "Inventarios de consumo general.",
            "Bienes inmuebles en construcción.",
            "Activos intangibles con vida útil finita.",
            "Semovientes en entrenamiento."
          ],
          "correct": 2,
          "feedback": "La amortización es el desgaste sistemático y periódico asignado al consumo de los activos intangibles."
        },
        {
          "question": "Un bien con control administrativo < 50 UVT en SILOG:",
          "options": [
            "No requiere placa física de identificación.",
            "Se deprecia mensualmente a una tasa fija del 5%.",
            "Mantiene los mismos controles logísticos y de responsabilidad de PPYE.",
            "Puede ser transferido a terceros sin generar actas."
          ],
          "correct": 2,
          "feedback": "A pesar de cargarse al gasto contable, se plaquea y controla físicamente bajo responsabilidad del funcionario igual que un PPYE."
        },
        {
          "question": "Los inventarios 'Bienes Producidos o Producto Terminado' corresponden a:",
          "options": [
            "Insumos de oficina comprados localmente.",
            "Elementos obtenidos de procesos de explotación, fabricación o cultivo internos de la fuerza listos para distribución/venta.",
            "Maquinaria pesada recibida de proveedores internacionales.",
            "Computadores alquilados bajo modelo de comodato."
          ],
          "correct": 1,
          "feedback": "Son bienes listos producidos directamente en los talleres o centros de explotación del Ministerio de Defensa."
        },
        {
          "question": "El Catálogo General de Cuentas para entidades de Gobierno es emitido por:",
          "options": [
            "El Ministerio de Hacienda y Crédito Público.",
            "La Contaduría General de la Nación.",
            "La Contraloría General de la República.",
            "La Jefatura Logística del Comando General."
          ],
          "correct": 1,
          "feedback": "La Contaduría General de la Nación es la máxima autoridad contable pública que emite el catálogo y directrices contables."
        },
        {
          "question": "¿Qué tipo de bienes se controlan en las cuentas de orden deudoras hasta que la autoridad defina su situación jurídica?",
          "options": [
            "Bienes recibidos sin contraprestación por convenios.",
            "Combustibles en tránsito.",
            "Bienes incautados o aprehendidos.",
            "Propiedades, planta y equipo en mantenimiento."
          ],
          "correct": 2,
          "feedback": "Los bienes incautados o retenidos se controlan provisionalmente en cuentas de orden hasta su formal decomiso o devolución."
        },
        {
          "question": "Las adiciones y mejoras a un activo se reconocen como:",
          "options": [
            "Gasto del periodo sin afectar la depreciación.",
            "Cuentas de orden deudoras transaccionales.",
            "Mayor valor del activo, recalculando la depreciación futura.",
            "Inventario consumible de repuestos en bodega."
          ],
          "correct": 2,
          "feedback": "Las adiciones aumentan la vida útil, capacidad o eficiencia, por lo que se capitalizan sumando al valor contable del activo."
        },
        {
          "question": "¿Qué clasificación reciben los animales utilizados para seguridad, aduanas, investigación o educación en el MDN?",
          "options": [
            "Bienes con control administrativo < 50 UVT.",
            "Semovientes dentro del grupo de Propiedades, Planta y Equipo.",
            "Inventarios de producto agropecuario terminado.",
            "Bienes históricos y culturales de aduana."
          ],
          "correct": 1,
          "feedback": "Los animales utilizados para seguridad u operaciones se clasifican formalmente como semovientes dentro de PPYE."
        },
        {
          "question": "El método de depreciación contable ordenado de manera general por el manual es:",
          "options": [
            "Suma de dígitos decrecientes.",
            "Línea recta.",
            "Reducción de saldos a doble cuota.",
            "Unidades de producción de vuelo."
          ],
          "correct": 1,
          "feedback": "La norma general exige aplicar el método de línea recta para distribuir de forma sistemática el desgaste del activo."
        },
        {
          "question": "Un activo intangible en 'Fase de Desarrollo' se registra para:",
          "options": [
            "Reconocer marcas adquiridas a terceros en licitaciones.",
            "Controlar programas informáticos en proceso de construcción que aún no cumplen requisitos de operación.",
            "Registrar las patentes vigentes con un plazo de explotación de 20 años.",
            "Registrar los repuestos de de comunicaciones del área técnica."
          ],
          "correct": 1,
          "feedback": "Representa los proyectos de software o intangibles propios en construcción, antes de que se autorice su lanzamiento oficial."
        },
        {
          "question": "Los bienes de arte y cultura del Ministerio de Defensa corresponden a:",
          "options": [
            "Marcas y patentes de seguridad nacional.",
            "Obras de arte, joyas, libros y elementos de museo declarados formalmente.",
            "Terrenos baldíos donde se realizan prácticas de ingenieros militares.",
            "Suministros de papelería e impresiones institucionales."
          ],
          "correct": 1,
          "feedback": "Son bienes de valor estético, simbólico o de memoria nacional declarados mediante acto administrativo formal."
        }
      ]
    },
    {
      "id": 2,
      "num": "II",
      "title": "El Almacén Militar",
      "subtitle": "Estructura, Clasificaciones, Funciones y Relevo del Personal",
      "header": {
        "purpose": "Definir las directrices para la creación, organización física, segregación de responsabilidades y procedimientos de relevo obligatorio del personal de almacenistas dentro del Ministerio de Defensa.",
        "difficulty": "Intermedio",
        "competencies": [
          "Diferenciar las operaciones transaccionales aplicables a almacenes físicos frente a almacenes virtuales en el sistema SILOG.",
          "Supervisar e implementar los 10 pasos reglamentarios para el relevo normal y especial de almacenistas.",
          "Evaluar perfiles de cargo para almacenistas, auxiliares y responsables de bienes en servicio de acuerdo con el manual."
        ],
        "expectedResult": "El estudiante podrá organizar físicamente un almacén con ubicación alfanumérica demarcada, dirigir un acta de entrega de almacén y validar los perfiles profesionales de su personal."
      },
      "objectives": {
        "general": "Normar la administración custodial de bodegas y almacenes del Ministerio de Defensa garantizando controles de seguridad, inventario físico e idoneidad del personal.",
        "specifics": [
          "Describir las 15 especialidades de almacén autorizadas en SILOG.",
          "Analizar las funciones generales y específicas del ecónomo, farmaceuta y almacenista de armamento.",
          "Diseñar el flujograma de seguridad y relevo custodial ante causas especiales."
        ],
        "procedural": "Realizar el conteo físico, reportar sobrantes/faltantes y elaborar actas de relevo en tinta indeleble.",
        "conceptual": "Comprender la responsabilidad legal que asume el almacenista sobre la custodia y seguridad física de los bienes."
      },
      "map": {
        "mainTopic": "Organización y Custodia del Almacén",
        "subtopics": [
          "Concepto de Almacén Militar",
          "Especialidades de Almacén",
          "Funciones del Personal",
          "Procedimiento de Relevo"
        ],
        "concepts": [
          "Almacén Virtual",
          "Ubicación Alfanumérica",
          "Responsabilidad Custodial",
          "Firma en Tinta"
        ],
        "procedures": [
          "Planificación de áreas de almacenamiento",
          "Operación de Relevo custodial",
          "Liquidación de Faltantes/Sobrantes"
        ],
        "documents": [
          "Acto administrativo de creación de almacén",
          "Póliza de seguro de manejo",
          "Acta de Entrega de Almacén",
          "Formatos de toma física"
        ],
        "actors": [
          "Ordenador del Gasto",
          "Almacenista entrante/saliente",
          "Jefe de área",
          "Supervisor del relevo"
        ],
        "controls": [
          "Bans de ubicación delimitada alfanuméricamente",
          "Revisión bimensual de seguridad contra incendios",
          "Prohibición de abrir el almacén sin presencia de todos los funcionarios del relevo"
        ],
        "exceptions": [
          "Almacén virtual carece de estructura física y solo maneja entradas y traslados directos a unidades receptoras."
        ]
      },
      "temario": [
        {
          "title": "2.1 Concepto de Almacén Físico y Virtual",
          "explanation": "El almacén dentro del contexto militar representa la dependencia física o virtual responsable del almacenamiento, conservación, control y distribución técnica de los bienes públicos del Ministerio de Defensa Nacional. Físicamente, exige una demarcación clara y una codificación alfanumérica de ubicaciones (estanterías, pasillos, bandejas) que garantice la rápida identificación y el control contra mermas o siniestros. Virtualmente, SILOG opera almacenes lógicos para administrar transacciones centralizadas o compras que no requieren paso por bodega física (distribución directa). La custodia física y el control administrativo del almacén recaen obligatoriamente sobre el Almacenista Principal, quien asume una responsabilidad solidaria y legal sobre las existencias, estando sujeto a las auditorías y tomas físicas de los comités de control logístico de la Fuerza.",
          "concepts": [
            {
              "name": "Almacén Físico",
              "desc": "Bodega tangible orientada a la recepción, resguardo y despacho de bienes."
            },
            {
              "name": "Almacén Virtual",
              "desc": "Transacción en SILOG que controla temporalmente inventarios centralizados antes de transferirlos."
            }
          ],
          "reference": "Capítulo II, Sección 2.1"
        },
        {
          "title": "2.2 Tipos y Especialidades de Almacén",
          "explanation": "Para garantizar la especialidad operativa y evitar la mezcla de elementos de diferente naturaleza, el sistema SILOG parametriza quince (15) especialidades de almacén en el Ministerio de Defensa. Cada especialidad cuenta con procedimientos custodiales independientes:\n\n1. **Armamento y Material de Guerra**: Custodia de armas, de fusiles Galil, ametralladoras, municiones, optrónicos y material reservado. Exige estrictos controles de seguridad física militar y bitácoras de revista diaria.\n2. **Intendencia**: Vestuario, equipo de campaña, menaje y alojamientos.\n3. **Comunicaciones**: Equipos de radio, antenas, y componentes de transmisión táctica.\n4. **Sanidad y Farmacia (Medicamentos)**: Medicamentos y dispositivos médicos. Exige controles de cadena de frío y registros de fecha de vencimiento.\n5. **Transportes y Repuestos**: Vehículos tácticos, administrativos y repuestos automotores.\n6. **Aeronáutico / Marítimo**: Almacenes especializados en soporte logístico para aviación militar y unidades navales, bajo estándares técnicos internacionales.\n7. **Combustibles y Lubricantes**: Control volumétrico y de calidad de hidrocarburos tácticos.\n8. **Economato y Raciones de Campaña**: Bodegas dedicadas a la recepción, almacenamiento y distribución de víveres y raciones alimenticias de campaña. Su operación logística está encomendada a un Ecónomo especializado.\n\nOtras especialidades incluyen: Remonta y Veterinaria, TICs (Tecnologías), Infraestructura, y Bienes Raíces. El almacenista o ecónomo responsable de cada bodega debe poseer el perfil técnico idóneo y certificar su capacitación en el manejo del módulo correspondiente de SILOG.",
          "reference": "Capítulo II, Sección 2.2"
        },
        {
          "title": "2.3 Organización Física del Almacenamiento",
          "explanation": "La creación y organización física de los almacenes del Ministerio de Defensa Nacional debe formalizarse de manera obligatoria a través de un Acto Administrativo expedido por el Ordenador del Gasto de la Unidad. Físicamente, el almacén debe estar organizado de acuerdo con especificaciones técnicas que incluyan:\n\n1. **Distribución de Áreas**: Zonas demarcadas de recepción, almacenamiento temporal, cuarentena (bienes rechazados o pendientes de análisis técnico), y despacho.\n2. **Seguridad**: Cerraduras de alta seguridad, sistemas de control de accesos, extintores de incendios bimonitoreados y prohibición absoluta de ingreso a personal no autorizado.\n3. **Segregación de Responsabilidades**: Las funciones operativas (recibir, almacenar y despachar) deben estar separadas de las funciones de control informático (SILOG) y contable (asientos en SIIF), evitando la concentración de atribuciones en un solo funcionario. Ningún almacenista puede ser juez y parte en las auditorías de su propio almacén.",
          "reference": "Capítulo II, Sección 2.3"
        },
        {
          "title": "2.4 Perfiles y Relevo Obligatorio",
          "explanation": "El almacenista es un servidor público o militar que asume la custodia directa y la responsabilidad administrativa del almacén asignado. De conformidad con las funciones del almacenista, debe cumplir obligatoriamente con:\n\n1. **Custodiar y Conservar**: Asegurar la integridad física de los bienes bajo su resguardo, previniendo daños, obsolescencia u hurtos mediante la aplicación de revistas de conservación técnica.\n2. **Registrar Movimientos**: Efectuar el registro diario en SILOG de todas las entradas, salidas, reintegros y traslados transaccionales del almacén, adjuntando los soportes legales requeridos.\n3. **Relevo Normal**: Comprende diez (10) pasos estrictos que inician con la emisión de la Resolución de Nombramiento y Póliza de Seguro de Manejo del almacenista entrante, seguido por la planeación del cronograma de entrega, un conteo físico manual del cien por ciento (100%) de las existencias en bodega frente al almacenista saliente y entrante, y finaliza con la firma en tinta del Acta de Entrega de Almacén detallando sobrantes, faltantes y novedades.\n\n4. **Relevo Especial**: Se ejecuta ante causas extraordinarias (fallecimiento, abandono de cargo, desaparición). El Ordenador del Gasto designa una Junta de Relevo (mínimo tres funcionarios) encargada de realizar la apertura forzada de la bodega, el conteo manual del 100% de las existencias, y firmar el acta definitiva como testigos legales de la entrega.",
          "reference": "Capítulo II, Sección 2.6 y 2.7"
        }
      ],
      "resumen": {
        "purpose": "Normar la organización física y el control custodial del personal de almacén en el sector Defensa.",
        "concepts": "Almacén virtual, estantería alfanumérica, fianza, relevo custodial.",
        "procedures": "Recepción de inventario, demarcación de bodegas, firma diaria de planillas de relevo.",
        "responsibilities": "El Ordenador del Gasto crea el almacén; el Almacenista responde por la conservación y seguridad del material; el Supervisor dirige la entrega.",
        "documents": "Resolución de nombramiento, Póliza de Manejo, Acta de Entrega de Almacén.",
        "controls": "Inspección bimensual de seguridad y extintores; inventario físico al 100% obligatorio para el relevo.",
        "mistakes": "Cometer la ligereza de abrir o contar bienes en el almacén sin que estén presentes el almacenista entrante, saliente y el supervisor."
      },
      "glosario": [
        {
          "term": "Almacenista",
          "definition": "Servidor público responsable de la custodia, conservación e inventario de un almacén.",
          "ref": "Sección 2.4"
        },
        {
          "term": "Relevo",
          "definition": "Procedimiento administrativo para traspasar la responsabilidad de una bodega de un funcionario a otro.",
          "ref": "Sección 2.6"
        },
        {
          "term": "Economato",
          "definition": "Almacén especializado en la recepción, control y suministro de víveres y raciones alimentarias.",
          "ref": "Sección 2.4.2.1"
        },
        {
          "term": "Póliza de Manejo",
          "definition": "Seguro obligatorio para empleados que custodian fondos o bienes del Estado.",
          "ref": "Sección 2.6.1"
        }
      ],
      "practica": {
        "context": "Traspaso de Mando y Custodia en un Almacén de Armamento",
        "scenario": "El Almacenista de Armamento del Batallón de Infantería No. 37 va a ser trasladado. Se emite la resolución de relevo nombrando al reemplazo y a un Oficial Supervisor. Durante el conteo físico de los fusiles Galil en estantes, se detecta un sobrante de 2 fusiles en el estante B-4 y un faltante de 1 mira optrónica en el estante A-2 respecto a la base de datos de SILOG.",
        "data": "Inventario SILOG vs Conteo Físico:\n- Fusil Galil 5.56: Registrado en SILOG = 150. Contado Físico = 152.\n- Mira Optrónica: Registrada en SILOG = 15. Contada Físico = 14.",
        "questions": [
          "¿Puede el nuevo almacenista firmar el acta de entrega recibiendo los fusiles sobrantes sin reportarlos?",
          "¿Cómo debe actuar el supervisor ante la mira optrónica faltante?",
          "¿Qué formalidad deben cumplir las planillas de conteo diario según el manual?"
        ],
        "steps": [
          "Suspender el despacho del almacén durante el proceso de relevo.",
          "Verificar físicamente la coincidencia de números de serie de los fusiles sobrantes con las planillas de ingresos históricos.",
          "El Supervisor liquida la mira faltante a valor comercial actual y reporta al Ordenador del Gasto.",
          "Elaborar la Entrada por Sobrante de fusiles en SILOG y firmar el acta final con firmas en tinta por todos los intervinientes."
        ],
        "criteria": "Manejo correcto de las diferencias de inventario aplicando los procedimientos de reportes e incorporación contable de sobrantes.",
        "solution": "1. Fusiles Sobrantes: No se pueden ignorar. El supervisor y almacenista deben verificar si corresponden a un error de digitación anterior. Si son sobrantes reales, se debe elaborar un acta especial y realizar una Entrada de Almacén por Sobrante de Bienes en SILOG para incorporarlos legalmente al activo.\n2. Mira Optrónica Faltante: El almacenista saliente es directamente responsable fiscal por la pérdida. El supervisor debe liquidar el valor de la mira optrónica a costo actual de reposición. El saliente debe reponer el valor o el elemento físico; de lo contrario, se reporta novedad para iniciar el proceso de responsabilidad fiscal y administrativa.\n3. Firmas: Todas las hojas de conteo diario se firman con tinta por el entrante, saliente y supervisor. Está estrictamente prohibido usar lápiz o dejar espacios en blanco."
      },
      "bancoPreguntas": [
        {
          "question": "¿Quién es la autoridad competente designada por el manual para crear formalmente un almacén militar?",
          "options": [
            "El Almacenista General de la Fuerza.",
            "El Ordenador del Gasto mediante acto administrativo.",
            "El Contador General de la Nación.",
            "El Supervisor de los contratos de adquisición."
          ],
          "correct": 1,
          "feedback": "El Almacén Militar se crea formalmente mediante acto administrativo expedido por el ordenador de gasto de la Unidad Ejecutora."
        },
        {
          "question": "El almacén virtual en SILOG se diferencia del almacén físico en que:",
          "options": [
            "No requiere ningún almacenista ni cuenta de manejo.",
            "Carece de estructura física y su saldo de existencias debe ser cero al final de cada periodo.",
            "Maneja almacenamiento de repuestos aeronáuticos por más de 12 meses.",
            "Se crea por fuera del Sistema de Información Logístico."
          ],
          "correct": 1,
          "feedback": "El almacén virtual es una figura transaccional transitoria; carece de bodegas físicas y su stock final debe ser siempre cero."
        },
        {
          "question": "¿Con qué frecuencia mínima debe el almacenista revisar que los extintores y equipos de seguridad estén óptimos?",
          "options": [
            "Semanalmente",
            "Mensualmente",
            "Bimensualmente",
            "Anualmente"
          ],
          "correct": 2,
          "feedback": "El manual exige que el almacenista revise bimensualmente que los equipos de seguridad de las bodegas se mantengan en condiciones óptimas."
        },
        {
          "question": "¿Qué sistema de identificación y ubicación de bienes en bodega debe aplicar obligatoriamente el almacenista?",
          "options": [
            "Ubicación aleatoria por fecha de ingreso.",
            "Identificación por colores según el costo del bien.",
            "Sistema de ubicación demarcada alfanuméricamente en estantes y estibas.",
            "Únicamente el registro en la base de datos digital de SIIF."
          ],
          "correct": 2,
          "feedback": "Es deber del almacenista estructurar el almacén físicamente mediante una demarcación alfanumérica de estanterías y ubicaciones."
        },
        {
          "question": "¿Qué perfil y nivel educativo exige el manual para desempeñar el cargo de Almacenista en el MDN?",
          "options": [
            "Título profesional en Ingeniería Civil y 2 años de experiencia.",
            "Técnico o Tecnólogo en Logística o Ciencias Económicas con mínimo 6 meses de experiencia y curso SILOG aprobado.",
            "Bachiller académico sin requerimiento de experiencia ni capacitaciones.",
            "Únicamente oficiales activos con grado superior a Coronel."
          ],
          "correct": 1,
          "feedback": "El cargo de almacenista requiere educación técnica/tecnológica afín, experiencia logística mínima de 6 meses y certificación SILOG."
        },
        {
          "question": "Durante el relevo de un almacenista, ¿en qué momento se puede proceder con la apertura y conteo físico del almacén?",
          "options": [
            "Cuando el almacenista saliente entregue las llaves al auxiliar.",
            "En el momento en que se encuentren presentes TODOS los funcionarios designados (entrante, saliente y supervisor).",
            "Cuando el supervisor lo autorice de manera telefónica.",
            "En cualquier momento del día sin requerir presencia del oficial supervisor."
          ],
          "correct": 1,
          "feedback": "El almacén no se podrá abrir ni iniciar el conteo físico hasta que todos los funcionarios asignados estén presentes en el sitio."
        },
        {
          "question": "¿Cuál es la norma de escritura exigida para diligenciar las planillas de conteo e inventario físico durante el relevo?",
          "options": [
            "Diligenciar a lápiz para permitir correcciones inmediatas.",
            "Diligenciar y firmar diariamente con tinta indeleble (nunca usar lápiz).",
            "Registrar únicamente por medio magnético usando hojas de cálculo Excel.",
            "No requiere firmas diarias, solo la firma del acta de entrega definitiva."
          ],
          "correct": 1,
          "feedback": "Todas las planillas de conteo físico y reportes diarios del relevo deben diligenciarse y firmarse con tinta indeleble de forma obligatoria."
        },
        {
          "question": "El relevo de un almacenista motivado por fallecimiento, abandono o inhabilidad se denomina:",
          "options": [
            "Relevo ordinario",
            "Relevo por causas especiales",
            "Relevo transitorio",
            "Cese de responsabilidad forzado"
          ],
          "correct": 1,
          "feedback": "Cualquier relevo imprevisto por abandono, incapacidad médica severa, inhabilidad o fallecimiento se cataloga como 'causa especial'."
        },
        {
          "question": "¿Qué amparo de garantía debe constituir obligatoriamente el almacenista designado antes de recibir el almacén?",
          "options": [
            "Póliza de seguro de vida",
            "Póliza de seguro de manejo y responsabilidad fiscal",
            "Garantía bancaria a favor del supervisor",
            "No requiere ningún tipo de fianza o póliza"
          ],
          "correct": 1,
          "feedback": "Todo almacenista o funcionario de manejo de bienes y dinero del estado debe constituir una póliza de seguro de manejo vigente."
        },
        {
          "question": "Si se detectan faltantes durante el inventario físico del relevo, ¿quién es el responsable de liquidarlos a valor comercial?",
          "options": [
            "El Ordenador del Gasto.",
            "El Oficial Supervisor de la entrega.",
            "El Almacenista entrante.",
            "El Contador de la fuerza."
          ],
          "correct": 1,
          "feedback": "Corresponde al supervisor del relevo liquidar las diferencias a valor comercial actual y reportar al Ordenador del Gasto."
        },
        {
          "question": "¿Qué especialidad de almacén de SILOG se identifica con el código transaccional '11'?",
          "options": [
            "Almacén General",
            "Almacén de Material de Guerra",
            "Almacén de Economato",
            "Almacén de Combustibles"
          ],
          "correct": 1,
          "feedback": "El código transaccional de SILOG '11' pertenece exclusivamente al Almacén de Material de Guerra (armamento y munición)."
        },
        {
          "question": "¿De quién es la responsabilidad sobre el almacenamiento, conservación y aplicación de seguridad contra incendios en el almacén?",
          "options": [
            "Del Oficial de Semana del batallón.",
            "Del Almacenista asignado en propiedad.",
            "Del Auxiliar logístico de la sección.",
            "Del Supervisor técnico del contrato."
          ],
          "correct": 1,
          "feedback": "La responsabilidad directa sobre las existencias, aseo y medidas de seguridad recae sobre el almacenista a cargo."
        },
        {
          "question": "El ecónomo es un almacenista especializado con la función de:",
          "options": [
            "Custodiar fusiles y material blindado.",
            "Controlar y responder por la recepción y suministro diario de víveres e insumos de alimentación.",
            "Despachar fórmulas médicas y controlar fechas de vencimiento de fármacos.",
            "Elaborar las hojas de vida de los bienes devolutivos en servicio."
          ],
          "correct": 1,
          "feedback": "El ecónomo es el responsable del almacén de economato, controlando la calidad y raciones de víveres en el comedor militar."
        },
        {
          "question": "Una de las funciones específicas del almacenista farmacéutico es:",
          "options": [
            "Despachar fórmulas médicas únicamente según prescripción médica oficial y controlar fechas de vencimiento de medicamentos.",
            "Almacenar las frutas en los mismos empaques en que se reciben.",
            "Responder por el aseo de los depósitos de munición.",
            "Elaborar las minutas de alimentación diaria."
          ],
          "correct": 0,
          "feedback": "El farmacéutico debe despachar medicamentos bajo fórmula médica formal, verificando estrictamente las fechas de expiración."
        },
        {
          "question": "El Auxiliar de Almacén tiene entre sus funciones específicas:",
          "options": [
            "Firmar las resoluciones de baja de bienes.",
            "Apoyar la toma de conteos físicos, elaboración del Estado Diario y archivar hojas de vida de bienes devolutivos.",
            "Constituir las pólizas generales de la Unidad Ejecutora.",
            "Aprobar el menú propuesto por el ecónomo."
          ],
          "correct": 1,
          "feedback": "El auxiliar apoya operativamente al almacenista en el archivo de hojas de vida, conteos físicos y reportes diarios."
        },
        {
          "question": "¿Con qué frecuencia mínima debe el almacenista de economato limpiar, asear y desinfectar la bodega de víveres?",
          "options": [
            "Semanalmente",
            "Mensualmente",
            "Diariamente",
            "Bimensualmente"
          ],
          "correct": 2,
          "feedback": "Por razones sanitarias obvias, el economato y los depósitos de víveres y alimentos deben asearse e higienizarse diariamente."
        },
        {
          "question": "Los cortes de carne fresca en los cuartos fríos de economato deben almacenarse de qué manera:",
          "options": [
            "En el suelo sobre arrumes cruzados.",
            "Colgados y elevados del suelo en ganchos de acero.",
            "Junto a los insecticidas y productos químicos de aseo.",
            "En bolsas de papel Kraft a temperatura ambiente."
          ],
          "correct": 1,
          "feedback": "El manual ordena que los cortes de carne fresca se mantengan en los cuartos fríos colgados, elevados y aislados del suelo."
        },
        {
          "question": "¿Cuál es el límite máximo de bultos o sacos permitidos por arrume en la bodega de granos de economato?",
          "options": [
            "Hasta 15 bultos por arrume.",
            "No hay límite mientras queden estables.",
            "Máximo 8 bultos por arrume en forma entrecruzada.",
            "Únicamente se permite un bulto por tarima de madera."
          ],
          "correct": 2,
          "feedback": "Para prevenir caídas y facilitar la circulación del aire, se prohíbe apilar más de 8 bultos de grano por arrume cruzado."
        },
        {
          "question": "¿Qué debe hacer inmediatamente el almacenista al detectar una novedad de robo o hurto de bienes a su cargo?",
          "options": [
            "Realizar un ajuste por sobrantes en SILOG.",
            "Esperar al final del mes para reportarlo en el Estado Consolidado.",
            "Reportar de forma inmediata por escrito a su jefe directo y al área de contabilidad.",
            "Reemplazar el material perdido comprándolo localmente con fondos públicos."
          ],
          "correct": 2,
          "feedback": "Cualquier pérdida imprevista por hurto, siniestro o daño debe reportarse inmediatamente al jefe para los trámites legales y de investigación."
        },
        {
          "question": "El acta de entrega final que formaliza la entrega de un almacén debe incluir las firmas de:",
          "options": [
            "Únicamente el almacenista entrante y el saliente.",
            "El supervisor logístico de la división central.",
            "El almacenista entrante, saliente, supervisor del relevo y el Jefe de Área.",
            "El Ordenador del Gasto y el Contador General de la Nación."
          ],
          "correct": 2,
          "feedback": "El acta de entrega del relevo la firman los cuatro involucrados directos para formalizar el traslado legal de la custodia."
        }
      ]
    },
    {
      "id": 3,
      "num": "III",
      "title": "Movimientos de Almacén",
      "subtitle": "Entradas y Salidas de Bienes, Orígenes y Soportes Legales",
      "header": {
        "purpose": "Detallar el flujo transaccional de entradas y salidas de bienes dentro del almacén militar, tipificando sus orígenes contables y los documentos exigidos como soporte.",
        "difficulty": "Intermedio",
        "competencies": [
          "Verificar la validez de los soportes obligatorios (factura electrónica, actas, contratos) antes de formalizar una entrada en SILOG.",
          "Clasificar los diferentes tipos de movimientos logísticos según su origen (adquisiciones, transferencias, donaciones, USSAP, reposición).",
          "Auditar los procesos de salida física formalizando el cese de responsabilidad mediante comprobantes de egreso en SILOG."
        ],
        "expectedResult": "El alumno podrá recibir mercancías de contratos nacionales y extranjeros, clasificar activos recibidos sin contraprestación y emitir comprobantes de baja por obsolescencia."
      },
      "objectives": {
        "general": "Unificar el control de ingresos y egresos físicos del Ministerio de Defensa de acuerdo con las directrices contables y de contratación del sector público.",
        "specifics": [
          "Identificar los soportes documentales para compras nacionales e importaciones internacionales.",
          "Analizar la dinámica transaccional del combustible y los lubricantes.",
          "Diferenciar entre bajas definitivas de activos y traslados por mantenimiento."
        ],
        "procedural": "Estructurar expedientes de entrada de almacén, auditar el acta de recibo del supervisor y registrar bajas transaccionales.",
        "conceptual": "Comprender que ninguna mercancía puede ingresar o salir físicamente de una unidad sin el debido registro en SILOG."
      },
      "map": {
        "mainTopic": "Control de Entradas y Salidas de Almacén",
        "subtopics": [
          "Entrada de Almacén",
          "Salida de Almacén",
          "Tipos de Ingresos",
          "Tipos de Egresos"
        ],
        "concepts": [
          "Soporte de Entrada",
          "Comprobante de Salida",
          "Baja de Bienes",
          "Reposición"
        ],
        "procedures": [
          "Recepción de bienes nacionales y extranjeros",
          "Suministro de elementos a funcionarios",
          "Tramitación de bajas y destrucción"
        ],
        "documents": [
          "Factura Electrónica",
          "Acta de recibo a satisfacción del supervisor",
          "Declaración de Importación (OFFSET)",
          "Resolución de baja"
        ],
        "actors": [
          "Almacenista",
          "Supervisor del Contrato",
          "Proveedor",
          "Compañía de Seguros"
        ],
        "controls": [
          "Conciliación física contra factura electrónica",
          "Registro obligatorio de series de bienes devolutivos",
          "Certificado de laboratorio técnico para compras de combustibles y químicos"
        ],
        "exceptions": [
          "Bienes en custodia ingresan físicamente pero no afectan los estados financieros del activo (solo control transaccional)."
        ]
      },
      "temario": [
        {
          "title": "3.1 Entrada de Almacén y Soportes Obligatorios",
          "explanation": "La Entrada de Almacén es el único documento oficial transaccional que acredita el recibo formal de bienes por parte de la Unidad Ejecutora del Ministerio de Defensa. Es la herramienta idónea que certifica la incorporación física de los bienes a las bodegas y constituye el soporte contable primario para los asientos financieros en el balance de la Fuerza. De acuerdo con el manual GF-M-001 V.2, la elaboración de una Entrada exige obligatoriamente la confrontación y archivo de los siguientes documentos soporte:\n\n1. **Copia del Contrato Principal**: Junto con sus modificaciones, prórrogas o adiciones vigentes.\n2. **Factura Electrónica de Venta**: Emitida por el proveedor con el lleno de requisitos fiscales de la DIAN, verificando NIT, dirección, descripción y precios unitarios coincidentes.\n3. **Acta de Recibo a Satisfacción del Supervisor**: Documento firmado por el oficial o funcionario designado como supervisor del contrato, certificando la idoneidad técnica y calidad de las entregas.\n4. **Certificaciones Especiales**: Ensayos de laboratorio, fichas técnicas de homologación o manifiestos aduaneros, según la naturaleza del bien.",
          "concepts": [
            {
              "name": "Entrada de Almacén",
              "desc": "Documento legal que formaliza la incorporación patrimonial y física de los bienes."
            },
            {
              "name": "Acta del Supervisor",
              "desc": "Declaración firmada que certifica que los elementos cumplen el 100% de las especificaciones contractuales."
            }
          ],
          "reference": "Capítulo III, Sección 3.1"
        },
        {
          "title": "3.2 Ingresos de acuerdo con su Origen",
          "explanation": "Los ingresos de elementos a los almacenes de las Fuerzas se clasifican rigurosamente por su origen para determinar su tratamiento de registro y causación financiera:\n\n1. **Adquisición Nacional (Proveedores Locales)**: Incorporación de bienes comprados mediante licitación pública, selección abreviada o contratación directa en el territorio nacional. Afectan las cuentas de existencias contra cuentas por pagar.\n2. **Adquisiciones en el Exterior (USSAP/FMS o INCOTERMS)**: Bienes importados que ingresan a través de la Dirección de Finanzas. Se registran inicialmente como 'Bienes en Tránsito' usando facturas proforma y de embarque (Bill of Lading). Al llegar físicamente, se elabora la Entrada de Almacén definitiva y se liquida a la TRM (Tasa Representativa del Mercado) correspondiente al día del acta de recibo.\n3. **Transferencias Internas (Traslados)**: Consiste en el movimiento definitivo de bienes muebles entre almacenes de diferentes unidades ejecutoras de la misma o diferente fuerza. Se formaliza mediante un documento de Traslado en SILOG, cesando la responsabilidad del remitente y cargándose al receptor sin duplicar los saldos financieros a nivel consolidado del MDN.",
          "reference": "Capítulo III, Sección 3.1.1"
        },
        {
          "title": "3.3 Entradas Especiales y Reposiciones",
          "explanation": "El manual contempla flujos especiales de Entrada que resuelven situaciones administrativas excepcionales:\n\n1. **Donaciones y Convenios OFFSET**: Incorporación de bienes recibidos de gobiernos extranjeros, corporaciones de defensa o convenios de cooperación industrial sin erogación presupuestal inmediata. Se valoran al costo de mercado convenido, o en su defecto, mediante avalúo técnico del costo de reposición.\n2. **Sobrantes de Bienes**: Elementos detectados en bodegas durante tomas físicas o inventarios rotativos que no figuran en SILOG. Previa investigación que descarte errores de digitación de entradas previas, se incorporan transaccionalmente mediante un Acta de Sobrantes, debitando la cuenta de inventarios y acreditando una cuenta de ingresos extraordinarios.\n3. **Reposiciones de Bienes**: Ingreso de un elemento nuevo de iguales o superiores especificaciones técnicas para sustituir uno dañado, siniestrado o perdido. Puede originarse por reclamo de póliza de seguro, garantía técnica del contratista, o por la reposición directa efectuada por el funcionario responsable de una pérdida, previa aprobación de la Junta Técnica.",
          "reference": "Capítulo III, Sección 3.1.1.5"
        },
        {
          "title": "3.4 Salidas de Almacén",
          "explanation": "La Salida de Almacén es el documento legal y real que formaliza el egreso físico de los bienes de las bodegas, cesando la responsabilidad custodial del almacenista y transfiriéndola al destinatario final. De acuerdo con el manual, se tipifican las siguientes salidas:\n\n1. **Suministro / Consumo**: Entrega directa de materiales consumibles (papelería, repuestos menores, víveres) o elementos devolutivos al personal militar o civil para el ejercicio diario de sus funciones misioneras y administrativas. Exige la firma de recibo de conformidad en la respectiva planilla SILOG.\n2. **Transferencias de Egresos**: Despacho de bienes devolutivos hacia otra Unidad Ejecutora del sector Defensa.\n3. **Baja de Bienes**: Retiro definitivo del activo de la entidad por conceptos de inservibilidad, obsolescencia técnica militar, o pérdida física (hurto o siniestro). El proceso de baja es indelegable y requiere obligatoriamente una Resolución Motivada del Ordenador del Gasto, un Acta de Destrucción firmada por testigos, y registros fotográficos/audiovisuales que verifiquen la inutilización del material.",
          "reference": "Capítulo III, Sección 3.2"
        }
      ],
      "resumen": {
        "purpose": "Tipificar el control de ingresos y egresos de inventario físico del sector Defensa.",
        "concepts": "Soporte de factura, USSAP, baja en cuenta, reposición por pérdida.",
        "procedures": "Recepción de compras nacionales, legalización de donaciones, tramitación de egresos de consumo.",
        "responsibilities": "El Almacenista verifica la factura y elabora el ingreso; el Supervisor firma la satisfacción; el Ordenador del Gasto firma las bajas.",
        "documents": "Factura electrónica, Bill of Lading, Acta de Sobrantes, Resolución de baja.",
        "controls": "Verificación de NIT y correspondencia exacta de cantidades contra contrato; registro de series obligatorias.",
        "mistakes": "Cometer la falta de realizar una salida definitiva de inventarios sin contar con la firma de recibo de conformidad en SILOG del funcionario destinatario."
      },
      "glosario": [
        {
          "term": "Entrada de Almacén",
          "definition": "Documento oficial transaccional que incorpora físicamente los bienes al patrimonio militar.",
          "ref": "Sección 3.1"
        },
        {
          "term": "Salida de Almacén",
          "definition": "Documento transaccional que formaliza el retiro real de bienes, cesando la responsabilidad del almacenista.",
          "ref": "Sección 3.2"
        },
        {
          "term": "Reposición",
          "definition": "Reemplazo de un bien dañado o perdido por otro de iguales características, cubierto por fianza, garantía o seguro.",
          "ref": "Sección 3.1.1.5.10"
        },
        {
          "term": "Baja de Bienes",
          "definition": "Proceso administrativo para retirar del activo un elemento inservible o destruido.",
          "ref": "Sección 3.2.5"
        }
      ],
      "practica": {
        "context": "Recepción Logística de Bienes de Cooperación Internacional (FMS)",
        "scenario": "Llega al Almacén General del Comando del Ejército un lote de 20 equipos de comunicación táctica satelital enviados a través del programa FMS (USSAP) de los Estados Unidos. Los equipos fueron recibidos en el exterior bajo término INCOTERMS FOB en Miami y han sido nacionalizados físicamente. El almacenista debe legalizar formalmente la Entrada en SILOG.",
        "data": "Detalle del ingreso:\n- Elementos: 20 Radios satelitales militares.\n- Costo total declarado: $120.000 USD (UVT de referencia para cálculo contable local).\n- Documentos aportados: Factura de la agencia internacional, Guía de Carga (Air Waybill) y acta de preinspección técnica en origen.",
        "questions": [
          "¿Qué tipo de Entrada de Almacén corresponde a este origen según el manual?",
          "¿Cuáles son los 3 documentos de soporte indispensables que debe archivar el almacenista?",
          "¿Cómo se determina el cese de la condición de 'bienes en tránsito'?"
        ],
        "steps": [
          "Verificar la presencia física de los 20 equipos en la bodega de la Unidad.",
          "Revisar que las referencias y números de serie físicos coincidan exactamente con la Guía de Carga y el acta de preinspección técnica.",
          "Elaborar en SILOG una Entrada de Almacén bajo la tipificación 'Bienes Adquiridos a través de Asistencia y Seguridad USSAP-FMS'.",
          "Convertir el valor declarado de dólares a pesos colombianos usando la tasa de cambio oficial (TRM) a la fecha del acta de preinspección, legalizando el ingreso contable."
        ],
        "criteria": "Estructuración completa del expediente de ingreso con el 100% de la documentación soporte internacional exigida.",
        "solution": "1. Tipo de Entrada: Corresponde a 'Otras Entradas - Bienes adquiridos a través del Programa USSAP'.\n2. Soportes obligatorios: Factura proforma de FMS, Guía Aérea (Air Waybill) y el Acta de Preinspección técnica firmada por el delegado militar en Miami.\n3. Cierre de Tránsito: Los equipos dejan de figurar en la cuenta 'Propiedades, Planta y Equipo en Tránsito' y pasan a 'Bienes Muebles en Bodega' (o material de guerra según sea el caso) al firmarse y radicarse la Entrada de Almacén física definitiva en la bodega de destino en Colombia."
      },
      "bancoPreguntas": [
        {
          "question": "¿Cuál de los siguientes documentos **NO** es un soporte obligatorio para elaborar una Entrada de Almacén por compra nacional?",
          "options": [
            "Acta de recibo a satisfacción del supervisor.",
            "Factura electrónica o documento soporte con requisitos de ley.",
            "Copia del contrato de adquisición con sus modificaciones.",
            "Extracto bancario del proveedor del mes anterior."
          ],
          "correct": 3,
          "feedback": "El extracto bancario no forma parte del expediente logístico de ingreso; los soportes obligatorios son el contrato, la factura y el acta del supervisor."
        },
        {
          "question": "Los bienes importados que se reciben en el extranjero bajo términos de negociación INCOTERMS se ingresan inicialmente como:",
          "options": [
            "Bienes en control administrativo.",
            "Bienes en tránsito.",
            "Bienes muebles en bodega.",
            "Bienes históricos nacionales."
          ],
          "correct": 1,
          "feedback": "El manual ordena registrar como 'Bienes en Tránsito' todas las compras en el extranjero desde que se asume el riesgo en origen hasta su llegada física."
        },
        {
          "question": "¿Cuál de los siguientes documentos soporta una Entrada de Almacén por 'Transferencia Interna'?",
          "options": [
            "El comprobante de salida firmado de la Unidad Ejecutora remitente.",
            "La cotización previa de repuestos del proveedor.",
            "La resolución de baja de material de guerra de la comandancia.",
            "Únicamente una factura electrónica sin costo comercial."
          ],
          "correct": 0,
          "feedback": "Las transferencias internas se legalizan en destino soportándose en el comprobante de salida o planilla de transferencia de la unidad emisora."
        },
        {
          "question": "Cuando se detectan bienes en bodega que superan las existencias reflejadas en los registros, el almacenista debe:",
          "options": [
            "Ignorarlos hasta el próximo relevo custodial.",
            "Venderlos de manera inmediata bajo subasta local.",
            "Elaborar un acta y realizar una Entrada de Almacén por 'Sobrante de Bienes' en SILOG.",
            "Registrarlos directamente como un reintegro de material inservible."
          ],
          "correct": 2,
          "feedback": "Cualquier excedente físico de inventario requiere un acta de conteo e incorporación formal mediante Entrada por Sobrante de Bienes."
        },
        {
          "question": "¿Qué tipo de entrada en SILOG se utiliza para legalizar bienes recibidos por acuerdos OFFSET de cooperación industrial?",
          "options": [
            "Entrada por compra directa nacional.",
            "Otras entradas - OFFSET (soportada en convenio, factura sin costo y declaración de importación).",
            "Entrada por reposición directa de funcionarios.",
            "Bienes recibidos en custodia temporal."
          ],
          "correct": 1,
          "feedback": "La cooperación OFFSET se legaliza como tal, soportada en el convenio industrial, la factura comercial sin costo y el manifiesto aduanero."
        },
        {
          "question": "El documento legal y administrativo que formaliza el cese definitivo de la responsabilidad del almacenista sobre un bien es:",
          "options": [
            "La planilla de conteo físico mensual.",
            "La Salida de Almacén debidamente registrada y firmada en SILOG.",
            "La factura electrónica del proveedor original.",
            "La resolución de nombramiento del supervisor."
          ],
          "correct": 1,
          "feedback": "La Salida de Almacén es el soporte transaccional definitivo que formaliza el egreso del bien y traslada la custodia legal."
        },
        {
          "question": "¿Qué proceso formal se requiere antes de dar de baja definitiva y destruir material inservible u obsoleto del MDN?",
          "options": [
            "Autorización verbal del almacenista general.",
            "Resolución motivada de baja, acta de destrucción y soportes de registro fotográfico/fílmico.",
            "Únicamente la radicación del Estado Consolidado Mensual.",
            "Venta directa del material a contratistas sin actas."
          ],
          "correct": 1,
          "feedback": "La destrucción de bienes requiere resolución formal de baja, presencia de testigos, acta detallada y evidencias fotográficas/fílmicas del proceso."
        },
        {
          "question": "Si una compañía de seguros repone un vehículo siniestrado de la Unidad, el ingreso se registra como:",
          "options": [
            "Entrada por producción interna.",
            "Reposición de bienes - Por compañía de seguros (soportada en resolución y póliza).",
            "Bienes incautados en operativos terrestres.",
            "Sobrante de propiedades, planta y equipo."
          ],
          "correct": 1,
          "feedback": "El ingreso de vehículos o elementos repuestos por siniestros cubiertos se clasifica como Reposición por Compañía de Seguros."
        },
        {
          "question": "Los repuestos y componentes capitalizados de propiedades, planta y equipo exigen como paso previo obligante:",
          "options": [
            "Cargar el valor de la fianza al contador.",
            "Realizar una salida transaccional de control administrativo.",
            "Dar de baja formalmente al componente o repuesto desgastado que ha sido sustituido.",
            "Vender el helicóptero completo bajo subasta."
          ],
          "correct": 2,
          "feedback": "Para evitar duplicidad en el activo, la capitalización de adiciones por repuestos exige dar de baja el componente que se retira."
        },
        {
          "question": "¿Qué documento legal y aduanero es indispensable para legalizar la entrada de bienes importados?",
          "options": [
            "La cotización comercial de Miami.",
            "La declaración de importación con levante aduanero formal.",
            "La póliza de fianza del almacenista entrante.",
            "El acta de destrucción del material obsoleto."
          ],
          "correct": 1,
          "feedback": "Cualquier ingreso del extranjero exige el manifiesto de importación legalmente nacionalizado y liberado por la DIAN."
        },
        {
          "question": "El combustible de aviación y terrestre se clasifica conceptualmente como:",
          "options": [
            "Bienes devolutivos de propiedades, planta y equipo.",
            "Bienes de consumo objeto de estricto control logístico en SILOG-SAP.",
            "Bienes intangibles de la fuerza.",
            "Bienes con control administrativo < 10 UVT."
          ],
          "correct": 1,
          "feedback": "El combustible es un bien consumible catalogado como inventario; se controla en SILOG-SAP por su criticidad en las operaciones."
        },
        {
          "question": "¿Bajo qué tipificación ingresa un bien prestado para un evento que debe devolverse al cabo de una semana?",
          "options": [
            "Entrada por donación sin costo.",
            "Entrada especial - En custodia (sin efecto en los estados financieros patrimoniales).",
            "Entrada por reposición directa.",
            "Bienes muebles en bodega nuevos."
          ],
          "correct": 1,
          "feedback": "Los bienes prestados o en custodia ingresan físicamente de forma temporal sin afectar el balance financiero de la Unidad."
        },
        {
          "question": "El reintegro de bienes devolutivos en servicio se presenta cuando:",
          "options": [
            "Un proveedor entrega material nuevo de un contrato.",
            "Un funcionario devuelve al almacén un bien a su cargo por deterioro, desuso o traslado.",
            "Se detecta un sobrante en el conteo físico bimensual.",
            "Se destruye material obsoleto bajo resolución de baja."
          ],
          "correct": 1,
          "feedback": "El reintegro es el retorno del bien devolutivo en servicio al almacén debido a desuso, desgaste o cese de funciones del empleado."
        },
        {
          "question": "La venta de bienes dados de baja en el Ministerio de Defensa debe realizarse mediante:",
          "options": [
            "Venta directa e informal al primer postor en efectivo.",
            "Procesos de subasta pública y mecanismos autorizados por las normas de contratación estatal.",
            "Donación unilateral a los almacenistas de la Unidad.",
            "No se permite la venta de ningún material dado de baja."
          ],
          "correct": 1,
          "feedback": "La enajenación de activos estatales dados de baja debe enmarcarse en los procesos formales de subasta y licitación pública del Estado."
        },
        {
          "question": "¿Quién nombra formalmente al supervisor de un contrato responsable de emitir el acta de satisfacción?",
          "options": [
            "El Almacenista General.",
            "El Ordenador del Gasto mediante designación escrita.",
            "El proveedor contratado en el extranjero.",
            "El jefe del Grupo SILOG."
          ],
          "correct": 1,
          "feedback": "El supervisor es designado formalmente por el Ordenador de Gasto para vigilar el cabal cumplimiento de las obligaciones contractuales."
        },
        {
          "question": "La reposición de un bien por pérdida imputada a un funcionario exige como soporte:",
          "options": [
            "Un concepto técnico que avale la equivalencia del bien repuesto y el recibo del almacenista en SILOG.",
            "El pago en efectivo al supervisor del relevo.",
            "Una declaración de importación con levante aduanero.",
            "La firma de la póliza de seguros del proveedor."
          ],
          "correct": 0,
          "feedback": "La reposición por pérdida exige que un técnico verifique la equivalencia del bien entregado por el funcionario y se legalice en SILOG."
        },
        {
          "question": "Un bien incautado en operativos militares se incorpora provisionalmente en contabilidad mediante:",
          "options": [
            "Cargarse directamente a la cuenta 1635 Bienes muebles.",
            "Registrarse en cuentas de orden deudoras hasta que se defina su situación jurídica.",
            "Cargarse como un gasto de consumo del periodo.",
            "No requiere ningún tipo de registro contable."
          ],
          "correct": 1,
          "feedback": "Los bienes incautados se controlan en cuentas de orden, sin sumar al activo patrimonial, hasta que un juez defina su decomiso o devolución."
        },
        {
          "question": "Las salidas de almacén por 'Suministro' tienen como finalidad principal:",
          "options": [
            "Transferir permanentemente la propiedad de los activos a empresas privadas.",
            "Entregar físicamente bienes devolutivos o de consumo a los funcionarios para el desarrollo de sus tareas.",
            "Enviar repuestos a la aduana para reparaciones en el exterior.",
            "Dar de baja activos por obsolescencia."
          ],
          "correct": 1,
          "feedback": "El suministro es el acto de entregar al funcionario las herramientas, uniformes o equipos indispensables para su trabajo."
        },
        {
          "question": "La reposición de bienes amparada en la garantía de compra exige del proveedor:",
          "options": [
            "La entrega de un bien de iguales o superiores especificaciones sin costo alguno para la entidad.",
            "Un descuento comercial en el próximo contrato de adquisición.",
            "El pago de la fianza del almacenista.",
            "El manual prohíbe las reposiciones por garantía."
          ],
          "correct": 0,
          "feedback": "La garantía exige al fabricante reemplazar el elemento defectuoso por uno en perfecto estado sin generar costos adicionales al Estado."
        },
        {
          "question": "La tendencia del saldo de inventarios en el almacén virtual al final de cada periodo debe ser:",
          "options": [
            "Igual o superior al 50% de las compras del año.",
            "Cero, una vez confirmadas todas las transferencias a las unidades receptoras.",
            "50 UVT por subunidad ejecutora.",
            "No tiene restricciones de saldo."
          ],
          "correct": 1,
          "feedback": "Al ser un canal de tránsito digital para compras centralizadas, su saldo final en SILOG debe quedar en absoluto cero."
        }
      ]
    },
    {
      "id": 4,
      "num": "IV",
      "title": "Procedimientos Administrativos",
      "subtitle": "Ingresos de Bienes, Bajas, Reparables y Reposiciones",
      "header": {
        "purpose": "Normar las secuencias operativas detalladas para formalizar la recepción, legalización aduanera, administración de bienes reparables, reintegros e inservibles dentro de las dependencias logísticas.",
        "difficulty": "Avanzado",
        "competencies": [
          "Coordinar y ejecutar el flujo de verificación para el ingreso de bienes nacionales e internacionales.",
          "Administrar el inventario de bienes reparables en SILOG (serviciables, reparados, dañados).",
          "Gestionar los procesos de reintegro de bienes devolutivos obsoletos y coordinar las bajas por reposición."
        ],
        "expectedResult": "Al finalizar el capítulo, el estudiante podrá dirigir una junta de bajas de material inservible, legalizar una importación de FMS y conciliar bienes en custodia y comodato."
      },
      "objectives": {
        "general": "Estandarizar las operaciones de administración, custodia y disposición final de bienes de propiedad o control del Ministerio de Defensa Nacional.",
        "specifics": [
          "Analizar las especificaciones del trámite de legalización de bienes recibidos en el extranjero.",
          "Describir la clasificación técnica de los bienes reparables.",
          "Determinar las diferencias entre el comodato y el recibo de material sin contraprestación."
        ],
        "procedural": "Verificar facturas electrónicas contra contratos, registrar el nacimiento de semovientes y legalizar reposiciones por siniestros.",
        "conceptual": "Comprender la responsabilidad administrativa e institucional que implica la firma de conformidad de un supervisor de contrato."
      },
      "map": {
        "mainTopic": "Operaciones Administrativas y Logísticas",
        "subtopics": [
          "Ingresos por Contratos",
          "Administración de Reparables",
          "Reintegros e Inservibles",
          "Reposiciones Especiales"
        ],
        "concepts": [
          "Incautación vs Decomiso",
          "Bienes Reparables",
          "Reposición por garantía",
          "Comodato"
        ],
        "procedures": [
          "Flujo de inspección contractual",
          "Registro transaccional de combustibles en SILOG-SAP",
          "Devolución de devolutivos deteriorados"
        ],
        "documents": [
          "Acta de Recibo a satisfacción",
          "Factura de proveedor internacional",
          "Concepto técnico de reposición",
          "Declaración DIAN con levante"
        ],
        "actors": [
          "Supervisor del contrato",
          "Junta de Bajas",
          "Almacenista",
          "Compañía de Seguros"
        ],
        "controls": [
          "Validación de NIT y TRM a la fecha del acta",
          "Cuentas de orden deudoras para incautaciones",
          "Plazos legales de reposición"
        ],
        "exceptions": [
          "Combustibles se cargan como inventario de consumo pero su administración exige control físico permanente en SILOG-SAP."
        ]
      },
      "temario": [
        {
          "title": "4.1 Flujo Operativo de Recepción Contractual",
          "explanation": "Toda compra de bienes por parte de las unidades del Ministerio de Defensa Nacional debe someterse a un riguroso Flujo Operativo de Recepción Contractual. Este procedimiento asegura el control logístico y contable del presupuesto público:\n\n1. **Planeación de Espacio**: El almacenista debe recibir de la oficina de contratos copia de los acuerdos con antelación, preparando las estanterías de recepción.\n2. **Confrontación Física**: Al llegar el contratista, se confronta físicamente la entrega contra la factura y el contrato, verificando coincidencia de cantidades, marcas y números de serie.\n3. **Inspección Técnica**: El supervisor del contrato realiza las pruebas de calidad e idoneidad técnica. Si cumple, firma el Acta de Recibo a Satisfacción.\n4. **Elaboración de Entrada**: Con el acta técnica y la factura electrónica aprobada, el almacenista genera la Entrada de Almacén en SILOG y remite los soportes al Grupo de Contabilidad dentro de las 48 horas siguientes.",
          "concepts": [
            {
              "name": "Verificación de NIT",
              "desc": "Comprobación de que el número de identificación tributaria del emisor de la factura corresponda exactamente con el contratista."
            },
            {
              "name": "Acta de Supervisor",
              "desc": "Documento oficial del supervisor que certifica el cumplimiento y avala la elaboración de la Entrada."
            }
          ],
          "reference": "Capítulo IV, Sección 4.1"
        },
        {
          "title": "4.2 Adquisiciones en el Exterior e Incautados",
          "explanation": "Las adquisiciones en el exterior y las incautaciones representan flujos de control diferenciados regulados por el manual:\n\n1. **Adquisiciones en el Exterior (USSAP/FMS o INCOTERMS)**: Ingresan contablemente como 'Bienes en Tránsito' en el momento en que se firma la entrega en puerto extranjero. Al llegar a la aduana nacional, se confronta el Bill of Lading, manifiestos DIAN y actas de preinspección. El almacenista elabora la Entrada de Almacén final liquidando los costos a la TRM del día de recibo real.\n2. **Bienes Incautados**: Aquellos elementos aprehendidos temporalmente en el desarrollo de operaciones militares de seguridad. Se levanta un acta con su descripción física y estado de conservación. Se registran de forma transitoria en cuentas de orden deudoras. Una vez que la autoridad competente emite el Fallo Firme de Decomiso (traspasando la propiedad legal al Estado), se elabora la Entrada de Almacén definitiva, incorporándolos al activo patrimonial.",
          "reference": "Capítulo IV, Sección 4.1.2.1.2 y 4.1.2.5.2"
        },
        {
          "title": "4.3 Clasificación de Bienes Reparables",
          "explanation": "Los bienes devolutivos reparables de las Fuerzas (como motores de aviación, transmisiones de vehículos blindados o tarjetas electrónicas de comunicaciones) exigen un control transaccional e informático riguroso en SILOG. Se clasifican bajo tres condiciones operativas obligatorias:\n\n1. **Serviciable**: Pieza o componente que ha sido desmontado de un equipo principal pero se encuentra en perfecto estado de funcionamiento y puede ser instalado inmediatamente en otro activo.\n2. **Reparado**: Elemento que presentaba fallas, pero tras un proceso de mantenimiento correctivo en taller militar o contratista certificado, recuperó el 100% de su potencial de servicio y reingresa a bodega.\n3. **Dañado**: Elemento desgastado o averiado que ha sido desmontado de un equipo y se encuentra almacenado temporalmente en espera de ser remitido a taller o descartado por la Junta Técnica.",
          "reference": "Capítulo IV, Sección 4.1.2.5.4"
        },
        {
          "title": "4.4 Reintegros, Inservibles y Bajas por Reposición",
          "explanation": "El manual estipula flujos administrativos rigurosos para la devolución de bienes y la liquidación de pérdidas:\n\n1. **Reintegros de Inservibles**: Cuando un bien devolutivo en servicio cumple su vida útil o sufre daños irreparables, el funcionario debe devolverlo formalmente al almacén mediante reintegro. El almacenista los ubica en la zona de inservibles.\n2. **Junta de Bajas**: Comité técnico encargado de inspeccionar físicamente los elementos inservibles del almacén. Emite el concepto de desecho, destrucción o remate mediante subasta pública.\n3. **Bajas por Reposición**: En caso de pérdida, extravío o hurto de un bien devolutivo, se inicia una investigación administrativa. La reposición puede realizarse por la Compañía de Seguros, por Garantía Técnica del contratista, o por el Funcionario Responsable. Este último puede entregar un bien nuevo idéntico o superior, o autorizar el descuento de nómina a valor comercial actual, previa aprobación de la junta loglogística.",
          "reference": "Capítulo IV, Sección 4.1.2.5.10 y 4.1.2.6"
        }
      ],
      "resumen": {
        "purpose": "Normar las operaciones administrativas y de taller para bienes del sector Defensa.",
        "concepts": "Manifiesto de aduanas, decomisos, piezas serviciables, junta de bajas.",
        "procedures": "Revisión contractual física, registro provisional de incautaciones, trámite de reclamos de garantía.",
        "responsibilities": "El Supervisor avala la idoneidad técnica; el Almacenista custodia los repuestos serviciables; la Junta de Bajas determina el destino final.",
        "documents": "Acta de Incautación, Certificado Técnico de Garantía, Acta de la Junta de Bajas.",
        "controls": "Uso de cuentas de orden para bienes incautados; validación de TRM en importaciones.",
        "mistakes": "Cometer el error de desechar o vender piezas dañadas de aeronaves o vehículos blindados sin adelantar el trámite formal de baja e inservibles de la Junta."
      },
      "glosario": [
        {
          "term": "Incautación",
          "definition": "Retención provisional de bienes en operativos militares en espera de fallo judicial.",
          "ref": "Sección 4.1.2.5.2"
        },
        {
          "term": "Decomiso",
          "definition": "Incorporación definitiva del bien al patrimonio estatal tras fallo firme de autoridad competente.",
          "ref": "Sección 4.1.2.5.3"
        },
        {
          "term": "Reparable",
          "definition": "Componente técnico que puede reconstruirse para recuperar su vida útil.",
          "ref": "Sección 4.1.2.5.4"
        },
        {
          "term": "Reintegro",
          "definition": "Devolución de elementos devolutivos al almacén por parte del funcionario en servicio.",
          "ref": "Sección 4.1.2.5.10.1"
        }
      ],
      "practica": {
        "context": "Gestión de Reintegro de Repuestos Reparables en Talleres de Mantenimiento",
        "scenario": "En el Batallón de Mantenimiento de Vehículos Anfibios, se retira un motor diesel dañado de un vehículo táctico para instalar uno nuevo. El mecánico a cargo entrega el motor desgastado en el Almacén de Vehículos. El Almacenista debe recibir el motor y decidir su tratamiento transaccional en SILOG de acuerdo con los lineamientos del manual.",
        "data": "Estado del motor:\n- Tipo de bien: Devolutivo reparable.\n- Diagnóstico inicial del taller: Dañado, pero con un 70% de probabilidad de recuperación mediante reconstrucción de culata y cilindros.\n- Costo estimado de reconstrucción: $4.000.000 COP. Costo del motor nuevo: $18.000.000 COP.",
        "questions": [
          "¿Cómo debe clasificar transaccionalmente el almacenista este motor en SILOG?",
          "¿Qué trámite debe realizarse para registrar el motor nuevo en el vehículo sin duplicar activos?",
          "¿Qué ocurre si el motor es declarado finalmente inservible por los ingenieros?"
        ],
        "steps": [
          "Recibir el motor en el almacén registrando su número de serie física.",
          "Registrar en SILOG el ingreso bajo la clasificación 'Otras Entradas - Reparables' con la condición 'Dañado'.",
          "Proceder a dar de baja formalmente en PPYE al motor sustituido del inventario del vehículo anfibio.",
          "Si el motor es reconstruido, actualizar su condición en SILOG de 'Dañado' a 'Reparado' a su valor comercial estimado."
        ],
        "criteria": "Correcta aplicación de la clasificación de bienes reparables y legalización de la baja del componente sustituido para evitar duplicidades.",
        "solution": "1. Clasificación: El almacenista debe recibir el motor y registrarlo en SILOG como 'Otras Entradas - Reparables' en estado 'Dañado' a su costo histórico o valor de salvamento.\n2. Evitar Duplicidad: Para ingresar el motor nuevo al activo del vehículo, el manual exige dar de baja previamente el motor retirado (el componente sustituido) en el inventario individual del vehículo.\n3. Inservible definitivo: Si el taller de ingenieros determina que el motor no tiene reparación viable, se emite concepto técnico. El motor se traslada a la Junta de Bajas para su desmantelamiento (aprovechamiento de piezas útiles) o su posterior destrucción formal."
      },
      "bancoPreguntas": [
        {
          "question": "Toda orden de adquisición o contrato debe recibirse en el Almacén con sus respectivos antecedentes:",
          "options": [
            "Con posterioridad a la elaboración de la Entrada de Almacén.",
            "Con la suficiente antelación a la fecha pactada de entrega para que el almacenista adecue las bodegas.",
            "Únicamente al finalizar la vigencia fiscal del Ministerio.",
            "No se requiere entregar antecedentes contractuales al almacén."
          ],
          "correct": 1,
          "feedback": "El manual exige entregar copias con antelación para que el almacenista programe el espacio y la logística de recepción física."
        },
        {
          "question": "Al recibir bienes del proveedor, ¿cuál de los siguientes aspectos **NO** es objeto de confrontación del almacenista?",
          "options": [
            "Acta de recibo a satisfacción del supervisor del contrato.",
            "Especificaciones técnicas y cantidades físicas entregadas.",
            "NIT y datos fiscales del proveedor en la factura electrónica.",
            "Las cotizaciones de los proveedores perdedores de la licitación."
          ],
          "correct": 3,
          "feedback": "Las cotizaciones de oferentes perdedores no forman parte de los soportes logísticos de la entrada; se confrontan los soportes de la compra adjudicada."
        },
        {
          "question": "¿Cómo se clasifican en SILOG las existencias temporales controladas por adquisiciones centralizadas en unidades de destino?",
          "options": [
            "Inventarios de consumo ordinario de oficina.",
            "Bienes en control transitorio de aduana.",
            "Almacén virtual (su saldo final debe ser cero al final del periodo).",
            "Bienes históricos de la Comandancia."
          ],
          "correct": 2,
          "feedback": "Los bienes de compras centralizadas ingresan al almacén virtual transitoriamente; al distribuirse y legalizarse su saldo en SILOG queda en cero."
        },
        {
          "question": "Los bienes adquiridos en el extranjero que se reciben en origen (INCOTERMS FOB/EXW) se clasifican inicialmente como:",
          "options": [
            "Bienes muebles en bodega nuevos.",
            "Propiedades, Planta y Equipo en Tránsito.",
            "Bienes de control administrativo < 50 UVT.",
            "Bienes incautados en aduana."
          ],
          "correct": 1,
          "feedback": "Las compras en el exterior se registran inicialmente en la cuenta de Tránsito desde que la fuerza asume el riesgo en el puerto de origen."
        },
        {
          "question": "¿Qué documento de transporte es soporte indispensable para legalizar bienes importados vía marítima?",
          "options": [
            "Guía de Carga Aérea (Air Waybill).",
            "Conocimiento de embarque (Bill of Lading).",
            "Resolución de baja por obsolescencia.",
            "Póliza de manejo del ecónomo."
          ],
          "correct": 1,
          "feedback": "El Bill of Lading (B/L) es el manifiesto marítimo oficial indispensable que soporta y legaliza la entrada en tránsito aduanero."
        },
        {
          "question": "El procedimiento de cambio de ubicación física de un bien entre subunidades de una misma Unidad Ejecutora se denomina:",
          "options": [
            "Reposición ordinaria.",
            "Transferencia interna.",
            "Comodato temporal.",
            "Baja custodial por traslado."
          ],
          "correct": 1,
          "feedback": "Las transferencias internas movilizan bienes entre dependencias o batallones cesando la responsabilidad del emisor y activando la del receptor."
        },
        {
          "question": "Una vez finalizado el proceso de fabricación en los talleres del MDN, ¿qué trámite debe realizarse para legalizar el producto?",
          "options": [
            "Elaborar una Salida por enajenación directa.",
            "Elaborar una Entrada de Almacén por producción de bienes (informando unidades y valor).",
            "Registrarlo en cuentas de orden deudoras incautadas.",
            "No requiere ningún trámite administrativo logístico."
          ],
          "correct": 1,
          "feedback": "Toda producción propia finalizada exige elaborar Entrada por Producción de Bienes para incorporarlos legalmente en SILOG."
        },
        {
          "question": "¿Qué documento soporta el pedido para ingresar transaccionalmente bienes recibidos en Comodato o Donación?",
          "options": [
            "La cotización previa de repuestos del proveedor.",
            "El acto administrativo que dispone la entrega o el acta de recibo a satisfacción del convenio.",
            "La resolución de baja del almacén general.",
            "El Estado Consolidado Mensual de víveres."
          ],
          "correct": 1,
          "feedback": "Los comodatos y donaciones sin contraprestación se soportan en el convenio formal y el acta de recibo que autoriza la entrega."
        },
        {
          "question": "¿En qué cuentas contables se controlan provisionalmente los bienes incautados en operativos militares?",
          "options": [
            "Cuenta 1635 Bienes muebles en bodega.",
            "Cuentas de orden deudoras (hasta que un juez defina su situación legal).",
            "Cuentas de gasto de consumo del periodo.",
            "Cuenta 1637 Propiedades planta y equipo no explotados."
          ],
          "correct": 1,
          "feedback": "Las incautaciones no son propiedad definitiva del estado, por lo que se registran transitoriamente en cuentas de orden para control de custodia."
        },
        {
          "question": "Un bien incautado ingresa definitivamente al patrimonio activo de la Unidad cuando:",
          "options": [
            "El almacenista le asigna una placa física.",
            "La autoridad competente emite fallo firme de Decomiso definiendo su valor.",
            "Se traslada a los cuartos fríos de economato.",
            "El supervisor de contrato emite su acta de satisfacción."
          ],
          "correct": 1,
          "feedback": "El decomiso judicial en firme es el único documento legal que permite transferir el bien incautado desde cuentas de orden al activo real."
        },
        {
          "question": "Un repuesto reparable que es desmontado de un vehículo pero está en condiciones técnicas de ser usado en otro se denomina:",
          "options": [
            "Inservible",
            "Reparado",
            "Serviciable",
            "Dañado"
          ],
          "correct": 2,
          "feedback": "El motor o componente desmontado que está en perfectas condiciones y listo para ser instalado se cataloga como 'Serviciable'."
        },
        {
          "question": "Para registrar el nacimiento de semovientes en el almacén de remonta, el soporte fundamental es:",
          "options": [
            "La declaración de importación con levante DIAN.",
            "El acta de nacimiento o alta correspondiente (especificando características individuales y cantidad).",
            "La factura de adquisición proforma internacional FMS.",
            "La resolución de la Junta de Bajas."
          ],
          "correct": 1,
          "feedback": "Las crías nacidas en las remontas ingresan formalmente mediante un acta de nacimiento veterinaria que detalla sus rasgos físicos."
        },
        {
          "question": "Los bienes recibidos por donación aduanera de la DIAN para actividades de acción social se registran mediante:",
          "options": [
            "Un ajuste contable de depreciación lineal.",
            "Entrada de almacén soportada en el acto administrativo de adjudicación.",
            "Se cargan directamente al gasto sin registro en SILOG.",
            "El manual prohíbe recibir donaciones de la DIAN."
          ],
          "correct": 1,
          "feedback": "Los bienes transferidos por la DIAN ingresan a SILOG con Entrada por donación soportada en el acto formal de adjudicación estatal."
        },
        {
          "question": "Los bienes adquiridos por cooperación internacional del programa USSAP deben ingresar a SILOG cuando:",
          "options": [
            "Se apruebe el presupuesto anual de gasta en Bogotá.",
            "Los bienes se nacionalicen físicamente y se reciban en el comando de la fuerza.",
            "Se firme el tratado de asistencia internacional.",
            "Se den de baja los helicópteros antiguos."
          ],
          "correct": 1,
          "feedback": "El material de programas de asistencia USSAP-FMS se incorpora en SILOG al finalizar su nacionalización y recibirse físicamente en bodegas."
        },
        {
          "question": "El combustible de aviación, marítimo y terrestre se controla logísticamente en SILOG mediante el módulo:",
          "options": [
            "SILOG-SAP (por tratarse de un bien de consumo objeto de estricto control logístico).",
            "Cuentas de orden deudoras temporales.",
            "Finca Raíz militar de la fuerza.",
            "No se controla en SILOG, solo en el SIIF contable."
          ],
          "correct": 0,
          "feedback": "Debido a su naturaleza y criticidad, el inventario y consumo de combustibles se gestiona a través del módulo especializado SILOG-SAP."
        },
        {
          "question": "El reintegro de un bien devolutivo en servicio se tramita obligatoriamente cuando:",
          "options": [
            "El bien se encuentra en perfecto estado y el empleado no lo requiere, o está deteriorado/inservible.",
            "El proveedor realiza la entrega física del contrato nacional.",
            "Se detecta un sobrante de PPYE en la auditoría mensual.",
            "Se realiza la liquidación de la mira optrónica perdida."
          ],
          "correct": 0,
          "feedback": "Los devolutivos se reintegran al almacén si el empleado cesa funciones, ya no requiere el elemento, o este se daña/desgasta."
        },
        {
          "question": "¿Qué trámite debe realizarse con los bienes devolutivos reintegrados que son declarados inservibles por concepto técnico?",
          "options": [
            "Se regalan a los soldados de la fuerza.",
            "Se trasladan a la Junta de Bajas para tramitar su baja definitiva del activo.",
            "Se almacenan indefinidamente en estibas sin demarcación.",
            "Se cargan al gasto contable como bienes con control administrativo."
          ],
          "correct": 1,
          "feedback": "El material inservible reintegrado debe presentarse con concepto técnico a la Junta de Bajas para su desincorporación definitiva."
        },
        {
          "question": "La reposición de un bien siniestrado por la compañía de seguros exige del almacenista:",
          "options": [
            "La entrega de un cheque de gerencia a favor del supervisor.",
            "Elaborar Entrada por reposición de seguros soportada en la resolución de baja por siniestro y la póliza.",
            "Registrar el vehículo en cuentas de orden deudoras temporales.",
            "No se permite reponer bienes a través de pólizas de seguros."
          ],
          "correct": 1,
          "feedback": "El ingreso del bien repuesto exige el acta de la aseguradora, el concepto de equivalencia técnica y la Entrada en SILOG."
        },
        {
          "question": "Si un bien de la fuerza falla durante el periodo de cobertura del fabricante, se debe exigir:",
          "options": [
            "La liquidación de la póliza de manejo del contador.",
            "La reposición por garantía (entrega de un bien nuevo idéntico o de superiores condiciones).",
            "La destrucción formal con actas fotográficas del motor fallado.",
            "Comprar un repuesto nuevo cargando el costo a la subunidad."
          ],
          "correct": 1,
          "feedback": "La cobertura técnica de garantía obliga al proveedor a reemplazar el elemento dañado por uno nuevo sin costo para la fuerza."
        },
        {
          "question": "Si se pierde un bien y el funcionario responsable decide reponerlo físicamente, ¿qué requisito técnico exige el manual?",
          "options": [
            "Entregar dinero en efectivo al almacenista entrante.",
            "Un concepto técnico que certifique la equivalencia y el perfecto estado del bien entregado por el funcionario.",
            "El levante aduanero DIAN del elemento nuevo.",
            "No se permite que los funcionarios repongan elementos perdidos en especie."
          ],
          "correct": 1,
          "feedback": "La reposición en especie por el funcionario exige un concepto técnico previo que certifique que el bien entregado cumple las condiciones."
        }
      ]
    },
    {
      "id": 5,
      "num": "V",
      "title": "Mecanismos de Control Interno",
      "subtitle": "Tomas Físicas, Segregación de Funciones y Auditorías de Almacén",
      "header": {
        "purpose": "Establecer las directrices de control interno, tomas físicas obligatorias, conciliaciones periódicas y el principio de segregación de funciones entre los responsables logísticos y contables.",
        "difficulty": "Avanzado",
        "competencies": [
          "Diseñar y ejecutar programas de tomas físicas periódicas y pruebas selectivas mensuales en bodegas.",
          "Implementar la conciliación de saldos mensuales entre el inventario de SILOG y los libros de Contabilidad.",
          "Verificar la correcta aplicación de la segregación de funciones impidiendo que un almacenista realice registros contables."
        ],
        "expectedResult": "Al finalizar el capítulo, el estudiante podrá dirigir una auditoría física en bodega, realizar un ajuste de inventarios conciliado con contabilidad y auditar las pólizas de manejo."
      },
      "objectives": {
        "general": "Fortalecer el sistema de control interno contable en el manejo de bienes resguardando el patrimonio del Ministerio de Defensa.",
        "specifics": [
          "Definir la periodicidad y alcance de los conteos físicos obligatorios.",
          "Analizar el principio de segregación de funciones entre Almacén y Contabilidad.",
          "Estructurar los reportes periódicos de novedades y diferencias de inventario."
        ],
        "procedural": "Ejecutar pruebas selectivas mensuales, estructurar actas de conciliación SILOG-Contabilidad y validar pólizas de manejo.",
        "conceptual": "Comprender la importancia del autocontrol y la responsabilidad fiscal de los servidores públicos que custodian bienes del Estado."
      },
      "map": {
        "mainTopic": "Control Interno de Inventarios y Activos",
        "subtopics": [
          "Tomas Físicas e Inventarios",
          "Segregación de Funciones",
          "Conciliaciones de Saldos",
          "Responsabilidades y Seguros"
        ],
        "concepts": [
          "Conteo físico obligatorio",
          "Prueba selectiva mensual",
          "Conciliación mensual SILOG-Contabilidad",
          "Fianza de manejo"
        ],
        "procedures": [
          "Planificación de inventario físico anual",
          "Auditoría de responsabilidades custodiales",
          "Conciliación de saldos financieros"
        ],
        "documents": [
          "Planilla de toma física",
          "Acta de conciliación contable",
          "Póliza de manejo del almacenista",
          "Minuta diaria de novedades"
        ],
        "actors": [
          "Almacenista",
          "Contador de la Unidad",
          "Oficial de Control Interno",
          "Supervisor logístico"
        ],
        "controls": [
          "Toma física obligatoria del 100% de bienes al menos una vez al año",
          "Prohibición de funciones duales (almacén y contabilidad)",
          "Cruces mensuales SILOG-SIIF"
        ],
        "exceptions": [
          "Bienes en servicio (entregados a funcionarios) se controlan mediante placas físicas individuales y actas de asignación."
        ]
      },
      "temario": [
        {
          "title": "5.1 Tomas Físicas e Inventarios Obligatorios",
          "explanation": "La toma física de inventarios es el mecanismo de control de mayor prioridad para garantizar la coincidencia entre la existencia real y los saldos del sistema SILOG. El almacenista de cada unidad debe realizar obligatoriamente una Toma Física General del 100% de los elementos almacenados bajo su custodia por lo menos una vez al año. Además, debe implementar un programa de Pruebas Selectivas Mensuales sobre elementos críticos, costosos, combustibles o de fácil sustracción. Todos los conteos se efectúan manualmente mediante planillas oficiales impresas, firmadas con tinta indeleble por el almacenista y el Oficial de Control Interno que actúa como veedor del proceso. Se prohíbe realizar tomas físicas basadas solo en consultas de pantalla.",
          "concepts": [
            {
              "name": "Toma Física General",
              "desc": "Verificación obligatoria anual del 100% de las existencias reales en bodega."
            },
            {
              "name": "Prueba Selectiva Mensual",
              "desc": "Conteo mensual de una muestra de elementos críticos o de alto valor en bodega."
            }
          ],
          "reference": "Capítulo V, Sección 5.1"
        },
        {
          "title": "5.2 El Principio de Segregación de Funciones",
          "explanation": "El autocontrol y la segregación de funciones son principios organizacionales rectores contemplados en el manual para prevenir fraudes, pérdidas o duplicidad de registros contables. Está absolutamente prohibido por directriz de Control Interno que un mismo funcionario ejerza funciones de carácter operativo y custodial (como recibir elementos, empacar, resguardar y despachar en el almacén) y al mismo tiempo realice el registro financiero y contable en SIIF Nación (funciones de causación contable). Ambas secciones deben mantener una estricta independencia jerárquica y operativa, cruzando sus datos de forma objetiva durante los cierres mensuales.",
          "reference": "Capítulo V, Sección 5.2"
        },
        {
          "title": "5.3 Conciliaciones Mensuales SILOG-Contabilidad",
          "explanation": "La conciliación mensual de saldos es el procedimiento obligatorio mediante el cual se confrontan las cifras financieras del balance de prueba de Contabilidad (SIIF) contra los inventarios valorados de logística (SILOG). A final de cada mes, el Almacenista y el Contador de la Unidad deben realizar los cruces al 100% de las existencias. De este proceso es obligatorio levantar y firmar un Acta de Conciliación Mensual detallando las inconsistencias (como tránsitos, demoras en el reporte de facturas, o traslados no causados). Se prohíbe cerrar los estados financieros de la vigencia con diferencias sin conciliar entre ambos sistemas.",
          "reference": "Capítulo V, Sección 5.3"
        },
        {
          "title": "5.4 Responsabilidades y Pólizas de Manejo",
          "explanation": "La responsabilidad fiscal y custodial compromete a todo servidor público o militar que administre, custodie o use bienes del Estado. Como garantía de protección del erario, todo almacenista militar u oficial de propiedades en servicio debe constituir de forma obligatoria una Póliza de Seguro de Manejo (fianza estatal). Ante la ocurrencia de una pérdida u hurto en bodega, el almacenista debe reportar la novedad en la Minuta de Novedades Diarias en un lapso no mayor a 24 horas, suspender preventivamente el acceso a la zona afectada, radicar la denuncia ante las autoridades competentes e iniciar el reclamo ante la aseguradora para activar el resguardo patrimonial.",
          "reference": "Capítulo V, Sección 5.4"
        }
      ],
      "resumen": {
        "purpose": "Establecer la cultura de autocontrol y fianza fiscal sobre los bienes de las Fuerzas.",
        "concepts": "Autocontrol, segregación de tareas, fianza, responsabilidad fiscal colectiva.",
        "procedures": "Programación de tomas físicas generales, cruces mensuales SILOG-SIIF, reporte de fallos.",
        "responsibilities": "El Almacenista realiza los conteos bimensuales; el Contador efectúa los cruces y conciliación; el Oficial de Control Interno audita las pólizas.",
        "documents": "Acta de Toma Física Anual, Acta de Conciliación Mensual, Pólizas de seguro de manejo de funcionarios.",
        "controls": "Inventario del 100% obligatorio; prohibición de registros contables directos por el almacenista.",
        "mistakes": "Cometer el descuido de dejar vencer la póliza de manejo del almacenista o postergar la conciliación de saldos con contabilidad por más de 30 días."
      },
      "glosario": [
        {
          "term": "Toma Física",
          "definition": "Verificación presencial obligatoria del inventario físico contra el sistema.",
          "ref": "Sección 5.1"
        },
        {
          "term": "Segregación",
          "definition": "División de responsabilidades operativas e informáticas para evitar concentración de funciones en un empleado.",
          "ref": "Sección 5.2"
        },
        {
          "term": "Conciliación Contable",
          "definition": "Proceso mensual de cruce de saldos entre los módulos de Almacén y Contabilidad.",
          "ref": "Sección 5.3"
        },
        {
          "term": "Póliza de Seguro",
          "definition": "Garantía que ampara al Estado contra detrimento patrimonial por dolo o culpa de sus funcionarios.",
          "ref": "Sección 5.4"
        }
      ],
      "practica": {
        "context": "Auditoría de Control Interno Contable en una Base Naval",
        "scenario": "En el Almacén General de la Base Naval de Cartagena, se realiza una auditoría anual por parte del Oficial de Control Interno. Al revisar los perfiles y accesos del sistema, se detecta que el Auxiliar de Almacén cuenta con credenciales activas en SILOG para dar ingresos de material y, al mismo tiempo, posee credenciales en SIIF Nación para radicar causaciones contables.",
        "data": "Detalle de hallazgos:\n- Funcionario: Auxiliar logístico de almacén.\n- Permisos SILOG: Crear entradas, transferencias y salidas definitivas.\n- Permisos SIIF: Registrar causación y asientos contables del Grupo 16.\n- Estado de Conciliación: El último acta de conciliación entre Contabilidad y Almacén se firmó hace 90 días.",
        "questions": [
          "¿Qué principio fundamental del manual de control interno se está vulnerando con los accesos del Auxiliar?",
          "¿Cuál es el plazo máximo permitido por el manual para realizar las conciliaciones mensuales de saldos?",
          "¿Qué acciones correctivas debe exigir el auditor de Control Interno?"
        ],
        "steps": [
          "Verificar la base de usuarios de SILOG y SIIF de la Unidad.",
          "Identificar credenciales cruzadas en funcionarios que intervienen en la custodia y registro.",
          "Elaborar informe de hallazgos del sistema de control interno contable.",
          "Revocar de inmediato los accesos contables en SIIF del Auxiliar y programar la conciliación de saldos atrasada."
        ],
        "criteria": "Identificación de violaciones al principio de segregación de funciones y cumplimiento estricto de las conciliaciones mensuales.",
        "solution": "1. Principio Vulnerado: Se vulnera gravemente el **Principio de Segregación de Funciones**. El personal que custodia o registra físicamente los movimientos en bodega (Almacén-SILOG) bajo ninguna circunstancia puede poseer accesos ni registrar contablemente (SIIF) en los libros contables.\n2. Conciliaciones: El manual establece de manera obligatoria que las conciliaciones de saldos entre SILOG y Contabilidad se deben realizar mensualmente. Un retraso de 90 días vulnera las normas del control interno contable de la Contaduría General.\n3. Medidas Correctivas: El auditor debe ordenar la revocación inmediata de los permisos del Auxiliar en SIIF Nación. Adicionalmente, se debe instruir a los jefes de Almacén y Contabilidad para levantar y firmar el acta de conciliación de saldos atrasada de los últimos 3 meses, documentando las diferencias y reportando las novedades."
      },
      "bancoPreguntas": [
        {
          "question": "¿Con qué frecuencia mínima exige el manual realizar una toma física general del 100% de los bienes en bodega?",
          "options": [
            "Mensualmente",
            "Bimensualmente",
            "Por lo menos una vez al año",
            "Al finalizar cada trimestre de la vigencia"
          ],
          "correct": 2,
          "feedback": "El manual ordena realizar de forma obligatoria un conteo físico general del 100% del almacén al menos una vez al año."
        },
        {
          "question": "El principio de 'Segregación de Funciones' prohíbe de manera absoluta que:",
          "options": [
            "El almacenista firme el acta de relevo en tinta.",
            "El mismo funcionario que custodia físicamente los bienes (Almacenista) registre contablemente en los libros (Contador).",
            "El supervisor asista a los conteos físicos de bodega.",
            "El Ordenador de Gasto asigne auxiliares logísticos en las remontas."
          ],
          "correct": 1,
          "feedback": "La segregación exige independencia operativa y digital absoluta entre quienes custodian (almacén) y quienes registran (contabilidad)."
        },
        {
          "question": "¿Con qué periodicidad deben conciliar saldos y firmar actas los Jefes de Almacén (SILOG) y Contabilidad (SIIF)?",
          "options": [
            "Semanalmente",
            "Mensualmente",
            "Anualmente durante la auditoría",
            "Bimensualmente con el reporte de extintores"
          ],
          "correct": 1,
          "feedback": "Es directriz obligatoria del control interno contable cruzar saldos y levantar actas de conciliación mensuales."
        },
        {
          "question": "¿Quiénes tienen responsabilidad sobre la custodia, manejo, uso y administración de los bienes del MDN?",
          "options": [
            "Únicamente el Almacenista General de la Fuerza.",
            "Todos los servidores públicos y contratistas que administren, custodien, manejen o usen bienes de la entidad.",
            "Exclusivamente el Oficial Supervisor y el Ordenador de Gasto.",
            "Ninguno, la responsabilidad recae en la compañía aseguradora."
          ],
          "correct": 1,
          "feedback": "Cualquier funcionario, civil o militar, y contratista que tenga asignado un bien estatal es responsable legal y fiscal de su uso y custodia."
        },
        {
          "question": "¿Qué requisito indispensable ampara al estado contra detrimentos fiscales cometidos por empleados de manejo?",
          "options": [
            "La firma de conformidad del supervisor logístico.",
            "La constitución y vigencia de una póliza de seguro de manejo.",
            "El plaqueado alfanumérico de las estanterías.",
            "No se requiere fianza en el sector Defensa."
          ],
          "correct": 1,
          "feedback": "Todo empleado de manejo debe constituir y mantener vigente una póliza de seguro que cubra el detrimento patrimonial."
        },
        {
          "question": "¿Quién realiza operativamente las pruebas selectivas de bodega con frecuencia mensual?",
          "options": [
            "El Contador General de la Nación.",
            "El Almacenista titular a cargo del almacén.",
            "El Oficial de Control Interno de la fuerza.",
            "El proveedor nacional contratado."
          ],
          "correct": 1,
          "feedback": "Las pruebas selectivas mensuales son deber directo del almacenista para mantener absoluto control del stock."
        },
        {
          "question": "¿Qué debe hacerse si en una prueba selectiva mensual se detecta un faltante no justificado de elementos?",
          "options": [
            "Registrar un ajuste transaccional en SILOG ocultando el faltante.",
            "Comprar un elemento similar en el mercado informal sin avisar.",
            "Reportar de forma inmediata por escrito al jefe logístico e iniciar investigación preliminar.",
            "Esperar a la toma física anual para reportarlo."
          ],
          "correct": 2,
          "feedback": "Cualquier faltante injustificado exige reportar inmediatamente e iniciar la investigación para establecer responsabilidades."
        },
        {
          "question": "El Acta de Conciliación de Saldos Mensual debe ser firmada en tinta por:",
          "options": [
            "Únicamente el almacenista y su auxiliar logístico.",
            "El Jefe de la Sección de Almacén y el Jefe del Grupo de Contabilidad.",
            "El Ordenador del Gasto y el Oficial Supervisor del relevo.",
            "El proveedor contratado y el perito de seguros."
          ],
          "correct": 1,
          "feedback": "El acta que formaliza la conciliación mensual la firman los jefes directos de las secciones de Almacén y Contabilidad."
        },
        {
          "question": "Si el perito de Control Interno detecta que una póliza de manejo está vencida, debe:",
          "options": [
            "Ignorar el vencimiento si la vigencia fiscal ya terminó.",
            "Suspender provisionalmente al funcionario de manejo y ordenar la renovación inmediata de la póliza.",
            "Multar al supervisor del contrato de adquisición.",
            "Comprar una fianza de seguros en el exterior."
          ],
          "correct": 1,
          "feedback": "Toda póliza vencida exige suspender el manejo de bienes por el empleado hasta que la fianza esté legalmente activa."
        },
        {
          "question": "El principio de autocontrol en la gestión de bienes significa que:",
          "options": [
            "Cada funcionario puede registrar sus propios movimientos sin SILOG.",
            "Cada servidor público y contratista vela por la adecuada administración, custodia y conservación de los bienes a su cargo.",
            "El Ordenador de Gasto asume todas las responsabilidades fiscales de la fuerza.",
            "No se requieren auditorías fiscales externas."
          ],
          "correct": 1,
          "feedback": "El autocontrol compromete a cada funcionario a custodiar y usar éticamente los recursos públicos asignados."
        },
        {
          "question": "¿Qué tipo de controles físicos deben tener los bienes con control administrativo < 50 UVT?",
          "options": [
            "Ninguno, al cargarse al gasto contable pierden controles logísticos.",
            "Los mismos controles de custodia, plaqueado y responsabilidad que las demás propiedades, planta y equipo.",
            "Se controlan únicamente en el SIIF contable sin placa física.",
            "Se regalan a los funcionarios después de 6 meses."
          ],
          "correct": 1,
          "feedback": "Los bienes de bajo valor pero vida útil larga mantienen rigurosos controles físicos y placas de identificación igual que un PPYE."
        },
        {
          "question": "La conciliación de inventarios del Ministerio de Defensa debe realizarse cruzando los sistemas:",
          "options": [
            "SILOG (logística/almacén) y SIIF Nación (contabilidad/finanzas).",
            "SIIF Nación y base de datos del proveedor internacional.",
            "Excel del almacenista y las resoluciones de la Junta de Bajas.",
            "Únicamente el SILOG-SAP de combustibles."
          ],
          "correct": 0,
          "feedback": "La conciliación obligatoria cruza las bases de datos de SILOG (almacén) contra el SIIF Nación (registros contables)."
        },
        {
          "question": "El Proceso de Responsabilidad Administrativa busca principalmente:",
          "options": [
            "Establecer perfiles de cargos para auxiliares de remonta.",
            "Establecer la responsabilidad fiscal y disciplinaria por pérdida o irregular administración de bienes públicos.",
            "Renovar las pólizas de Finca Raíz de la fuerza.",
            "Destruir material de guerra obsoleto."
          ],
          "correct": 1,
          "feedback": "Este proceso investiga detrimentos patrimoniales para sancionar y lograr la recuperación económica de los recursos estatales perdidos."
        },
        {
          "question": "¿Quién es el encargado de verificar permanentemente que no existan bienes muebles registrados en cuenta de no explotados sin justificación?",
          "options": [
            "El Jefe del Grupo SILOG del Comando.",
            "El Almacenista titular de la Unidad.",
            "El proveedor contratado por licitación.",
            "El perito de la aseguradora siniestrada."
          ],
          "correct": 1,
          "feedback": "El almacenista debe revisar constantemente que los bienes en cuenta 1637 no estén inactivos sin un diagnóstico técnico real."
        },
        {
          "question": "Está estrictamente prohibido que las planillas de tomas físicas e inventarios se realicen a:",
          "options": [
            "Computadora mediante sistemas informáticos.",
            "Lápiz de mina de carbón u otro elemento borrable.",
            "Tinta indeleble de color azul.",
            "Impresión láser en papel membretado."
          ],
          "correct": 1,
          "feedback": "Se prohíbe taxativamente usar lápiz o elementos borrables para impedir tachaduras, enmiendas o adulteraciones en los conteos."
        },
        {
          "question": "El Oficial de Control Interno realiza auditorías en el almacén militar para:",
          "options": [
            "Clasificar medicamentos según su fecha de vencimiento.",
            "Verificar el cumplimiento de normas de control, conciliaciones mensuales y vigencia de las pólizas de manejo.",
            "Elaborar las minutas del comedor de economato.",
            "Destruir armamento obsoleto."
          ],
          "correct": 1,
          "feedback": "La auditoría evalúa la efectividad de las medidas preventivas, vigencia de fianzas de manejo y conciliaciones contables obligatorias."
        },
        {
          "question": "¿Qué ocurre si una auditoría detecta una diferencia injustificada recurrente en los stocks de combustibles?",
          "options": [
            "Se realiza un reintegro de material inservible.",
            "Se inicia de forma inmediata una investigación preliminar fiscal y se suspende el flujo logístico no auditado.",
            "Se ignora el faltante cargándolo a la cuenta de adiciones.",
            "Se aumenta el valor de la póliza de seguros del contador."
          ],
          "correct": 1,
          "feedback": "Cualquier diferencia recurrente en combustibles exige reporte inmediato, investigación fiscal y peritajes técnicos en tanques."
        },
        {
          "question": "La fianza de manejo del almacenista de economato debe amparar:",
          "options": [
            "La vida útil de los semovientes de remonta.",
            "La custodia y conservación de los víveres e insumos bajo su control directo en bodega.",
            "Únicamente los predios construidos de Finca Raíz.",
            "Las compras centralizadas del Comando General."
          ],
          "correct": 1,
          "feedback": "La póliza de fianza ampara los elementos específicos en custodia; para el ecónomo, cubre los inventarios de alimentos y víveres."
        },
        {
          "question": "El almacenamiento de bienes entregados en custodia temporal a la Unidad exige:",
          "options": [
            "Ignorarlos en SILOG por no ser propios.",
            "Los mismos controles de orden, rotulado y seguridad aplicados al inventario propio patrimonial.",
            "Su enajenación inmediata bajo subasta pública.",
            "No requiere ningún tipo de fianza o placa."
          ],
          "correct": 1,
          "feedback": "Aunque no se carguen al balance financiero de la fuerza, los bienes en custodia exigen la misma diligencia de resguardo y seguridad."
        },
        {
          "question": "El archivo de las planillas de inventario y actas de tomas físicas anuales debe reposar en:",
          "options": [
            "La oficina del proveedor nacional.",
            "El archivo físico y magnético del Almacén Militar por los términos legales de conservación de documentos contables.",
            "La remonta de semovientes de la fuerza.",
            "El computador personal del supervisor del relevo."
          ],
          "correct": 1,
          "feedback": "Las planillas de tomas físicas son documentos legales probatorios contables y deben conservarse bajo estricto archivo logístico."
        }
      ]
    },
    {
      "id": 6,
      "num": "VI",
      "title": "Bienes Inmuebles",
      "subtitle": "Terrenos, Edificaciones y Titulación de Predios Militares",
      "header": {
        "purpose": "Normar el control físico, inventario, saneamiento legal e incorporación contable de terrenos, edificaciones, redes y construcciones en curso del Ministerio de Defensa.",
        "difficulty": "Avanzado",
        "competencies": [
          "Identificar y clasificar los diferentes tipos de activos inmobiliarios (terrenos, construcciones en curso, edificaciones, redes).",
          "Intervenir en los procesos de saneamiento, titulación y legalización de predios de propiedad de las Fuerzas.",
          "Verificar e incorporar actas de entrega de obras e infraestructura finalizada de ingenieros militares."
        ],
        "expectedResult": "El estudiante podrá clasificar predios militares, auditar las actas de entrega de obras finalizadas y reportar el saneamiento inmobiliario al Jefe de Finca Raíz."
      },
      "objectives": {
        "general": "Garantizar la protección y el saneamiento jurídico de la Finca Raíz del Ministerio de Defensa Nacional de acuerdo con las leyes y directrices gubernamentales.",
        "specifics": [
          "Definir el concepto de construcciones en curso.",
          "Describir la dinámica contable de los terrenos y las adiciones inmobiliarias.",
          "Estructurar los requisitos de legalización de predios nacionales."
        ],
        "procedural": "Auditar las fichas catastrales, contrastar escrituras públicas contra el registro de Finca Raíz y legalizar construcciones terminadas.",
        "conceptual": "Comprender la importancia del saneamiento catastral e inmobiliario para salvaguardar el patrimonio del Estado."
      },
      "map": {
        "mainTopic": "Administración de Activos Inmobiliarios (Finca Raíz)",
        "subtopics": [
          "Clasificación de Inmuebles",
          "Construcciones en Curso",
          "Saneamiento y Titulación",
          "Redes e Infraestructura"
        ],
        "concepts": [
          "Bien inmueble por adhesión",
          "Edificación terminada",
          "Terreno ejido o fiscal",
          "Saneamiento jurídico"
        ],
        "procedures": [
          "Recepción de obras de ingenieros",
          "Titulación de predios e inscripción catastral",
          "Capitalización de mejoras locativas"
        ],
        "documents": [
          "Escritura Pública",
          "Certificado de Libertad y Tradición",
          "Acta de liquidación de obra de infraestructura",
          "Ficha predial"
        ],
        "actors": [
          "Jefe de Finca Raíz militar",
          "Ingenieros Militares",
          "Ordenador de Gasto",
          "Oficina de Registro de Instrumentos Públicos"
        ],
        "controls": [
          "Conciliación semestral de predios con inventario nacional",
          "Inscripción obligatoria de escrituras en Instrumentos Públicos",
          "Aprobación técnica de obras"
        ],
        "exceptions": [
          "Terrenos en disputa legal se registran en cuentas de orden deudoras hasta que un juez dictamine propiedad definitiva."
        ]
      },
      "temario": [
        {
          "title": "6.1 Clasificación de Inmuebles en el sector Defensa",
          "explanation": "Los bienes inmuebles en el sector Defensa comprenden los activos tangibles de carácter permanente que no pueden ser trasladados de un lugar a otro sin sufrir alteración o destrucción (terrenos y edificaciones de bases militares, batallones, pistas aéreas y muelles navales). Contablemente se clasifican en:\n\n1. **Terrenos**: Lotes de tierra propios o recibidos a cualquier título de otra entidad pública.\n2. **Edificaciones**: Construcciones civiles permanentes empleadas para el cumplimiento de las misiones tácticas o administrativas.\n3. **Bienes por Adhesión**: Estructuras accesorias unidas de forma física e indisoluble al suelo o edificación principal (como hangares desmontables, subestaciones eléctricas), perdiendo su autonomía y registrándose como mayor valor del inmueble.",
          "concepts": [
            {
              "name": "Terreno",
              "desc": "Predio o lote de tierra controlado por el MDN de forma permanente."
            },
            {
              "name": "Inmueble por Adhesión",
              "desc": "Bien mueble incorporado definitivamente al suelo perdiendo su autonomía física."
            }
          ],
          "reference": "Capítulo VI, Sección 1.2.1.2.2"
        },
        {
          "title": "6.2 Construcciones en Curso y Redes",
          "explanation": "Corresponde a todos los desembolsos y costos de ingeniería incurridos en la construcción, ampliación o mejoras locativas de infraestructura militar efectuadas por contratistas civiles o batallones de Ingenieros Militares. Contablemente, mientras la obra esté en ejecución, se acumulan los costos bajo la cuenta 'Construcciones en Curso'. Asimismo, se deben registrar de forma componentizada las redes de servicios públicos internas (acueducto, cableados eléctricos blindados) e infraestructuras especiales de defensa (túneles, trincheras blindadas, polígonos) asociadas al predio.",
          "reference": "Capítulo VI, Sección 1.2.1.2.2.2 y 1.2.1.2.2.5"
        },
        {
          "title": "6.3 Saneamiento Catastral y Titulación Jurídica",
          "explanation": "Es una obligación prioritaria de la Oficina de Finca Raíz de cada Fuerza adelantar el Saneamiento Catastral y la Titulación Jurídica del 100% de los predios de uso militar de la Fuerza. Todo inmueble bajo control del MDN debe contar con su respectiva Escritura Pública registrada y el Certificado de Libertad y Tradición vigente expedido por la Oficina de Registro de Instrumentos Públicos correspondiente. Se prohíbe poseer terrenos de uso operacional sin título de propiedad legalizado. Los predios o áreas en litigio legal de linderos se registran provisionalmente en cuentas de orden deudoras hasta que exista sentencia judicial firme.",
          "reference": "Capítulo VI, Sección 6.3"
        },
        {
          "title": "6.4 Entrega de Obras de Infraestructura",
          "explanation": "Al culminar físicamente una obra de infraestructura o edificación militar, los contratistas y los ingenieros militares deben elaborar de forma obligatoria el Acta de Entrega Física de Obra y el Acta de Liquidación Final del Contrato. Estos soportes documentales, acompañados por los planos definitivos y memorias de costos componentizados, se radican ante el Almacenista General de la Fuerza. El almacenista elabora la Entrada de Almacén de Inmuebles, permitiendo al Grupo de Contabilidad efectuar el traslado financiero desde la cuenta 'Construcciones en Curso' a 'Edificaciones terminadas' para dar inicio formal a la depreciación del activo.",
          "reference": "Capítulo VI, Sección 6.4"
        }
      ],
      "resumen": {
        "purpose": "Normar el control patrimonial, físico y catastral de los inmuebles del Ministerio de Defensa.",
        "concepts": "Finca raíz, construcciones civiles, saneamiento predial, registro de instrumentos.",
        "procedures": "Inscripción en catastro predial, recepción de obras terminadas de ingenieros, saneamiento legal.",
        "responsibilities": "El Jefe de Finca Raíz lidera el saneamiento jurídico; el Almacenista General elabora el ingreso de la obra finalizada; el Contador capitaliza las mejoras.",
        "documents": "Escritura de Propiedad, Certificado de Tradición, Acta de Liquidación de Obra.",
        "controls": "Cruces anuales catastrales con bases nacionales; inventario físico de linderos obligatorio.",
        "mistakes": "Cometer la omisión de no registrar la escritura pública de un terreno militar ante la Oficina de Registro de Instrumentos Públicos, dejando el predio desprotegido."
      },
      "glosario": [
        {
          "term": "Inmueble",
          "definition": "Bienes tangibles que no pueden trasladarse de lugar sin alterar su integridad física.",
          "ref": "Sección 1.2.1.2.2"
        },
        {
          "term": "Finca Raíz",
          "definition": "Oficina militar responsable de catalogar, sanear e inventariar los predios e instalaciones.",
          "ref": "Sección 6.3"
        },
        {
          "term": "Tradición",
          "definition": "Historial legal de la propiedad inmobiliaria registrado ante instrumentos públicos.",
          "ref": "Sección 6.3"
        },
        {
          "term": "Adhesión",
          "definition": "Unión física e indisoluble de una estructura al suelo de un terreno.",
          "ref": "Sección 1.2.1.2.2.3"
        }
      ],
      "practica": {
        "context": "Saneamiento e Incorporación de una Nueva Bodega Logística",
        "scenario": "Los Ingenieros Militares finalizan la construcción de una bodega de 2.000 metros cuadrados en el Cantón Militar de Puente Aranda. La obra fue realizada por administración directa con un costo total de materiales y mano de obra de $850.000.000 COP. El Almacenista y el Jefe de Finca Raíz deben legalizar la edificación.",
        "data": "Detalle de la obra:\n- Elemento: Bodega de almacenamiento pesado.\n- Costo total acumulado en 'Construcciones en Curso': $850.000.000 COP.\n- Soporte de ingenieros: Planos aprobados, acta de entrega de obra y desglose de costos de materiales.",
        "questions": [
          "¿Cómo se traslada financieramente la obra de 'Construcciones en Curso' a 'Edificaciones'?",
          "¿Qué papel cumple el Almacenista General de la Unidad en esta entrega?",
          "¿Qué registro catastral e inmobiliario es obligatorio tramitar?"
        ],
        "steps": [
          "Verificar la recepción física de la edificación y confrontar las especificaciones con los planos.",
          "Elaborar en SILOG el comprobante de Entrada de Almacén por terminación de obra de infraestructura.",
          "Cerrar la cuenta de 'Construcciones en Curso' y trasladar el saldo a la cuenta contable 1640 'Edificaciones'.",
          "Radicar copia del acta de entrega ante la Oficina de Finca Raíz militar para actualizar la ficha predial catastral."
        ],
        "criteria": "Correcto traslado contable del valor acumulado de construcción al activo de edificaciones y actualización del inventario predial.",
        "solution": "1. Traslado de Activo: Se debe realizar una nota contable que acredite la cuenta 'Construcciones en Curso' por $850.000.000 COP y debite la cuenta 1640 'Edificaciones' por el mismo valor, formalizando la terminación.\n2. Rol del Almacenista: El almacenista general elabora el ingreso físico transaccional en SILOG soportándose en el acta de entrega y desglose de costos aportado por los ingenieros, plaqueando administrativamente la instalación.\n3. Registro Catastral: El Jefe de Finca Raíz debe registrar la nueva bodega en la ficha predial individual del Cantón Militar, anexando el acta a la carpeta catastral del lote original inscrita en Instrumentos Públicos."
      },
      "bancoPreguntas": [
        {
          "question": "Los bienes que no pueden transportarse de un lugar a otro sin que se destruyan o deterioren se clasifican como:",
          "options": [
            "Bienes con control administrativo.",
            "Bienes devolutivos serviciables.",
            "Bienes inmuebles.",
            "Bienes históricos de aduana."
          ],
          "correct": 2,
          "feedback": "Los terrenos y edificaciones se clasifican como bienes inmuebles por su imposibilidad física de ser trasladados."
        },
        {
          "question": "¿Cómo se define un bien inmueble por 'Adhesión' según el manual?",
          "options": [
            "Un bien prestado en comodato a una empresa constructora.",
            "Todo elemento incorporado físicamente al suelo o a un inmueble pasando a formar parte de este de manera indisoluble.",
            "Bienes que están en aduana esperando el levante de nacionalización.",
            "Únicamente los software de telemática."
          ],
          "correct": 1,
          "feedback": "Los hangares, bodegas y adiciones de obra que se anclan permanentemente al terreno son inmuebles por adhesión."
        },
        {
          "question": "¿Qué cuenta representa los costos incurridos en la edificación o ampliación de predios hasta su terminación?",
          "options": [
            "Cuenta 1635 Bienes muebles en bodega.",
            "Construcciones en curso.",
            "Propiedades, planta y equipo no explotados.",
            "Terrenos ejidos fiscales."
          ],
          "correct": 1,
          "feedback": "Las obras en construcción se controlan en la cuenta transitoria de 'Construcciones en Curso' hasta su entrega y liquidación física."
        },
        {
          "question": "¿Qué documento oficial certifica la tradición e historial legal de propiedad de un inmueble en Colombia?",
          "options": [
            "La cotización comercial de la obra de ingenieros.",
            "El Certificado de Libertad y Tradición emitido por la Oficina de Registro de Instrumentos Públicos.",
            "La planilla de tomas físicas de la Junta de Bajas.",
            "El comprobante de salida definitiva de SILOG."
          ],
          "correct": 1,
          "feedback": "El Certificado de Libertad y Tradición es el único documento legal probatorio que certifica la propiedad real del predio."
        },
        {
          "question": "La legalización y el saneamiento catastral de los terrenos militares es responsabilidad prioritaria de:",
          "options": [
            "El Almacenista de Economato de la subunidad.",
            "La Oficina de Finca Raíz de la fuerza.",
            "El proveedor contratado por licitación.",
            "El Oficial Supervisor del relevo ordinario."
          ],
          "correct": 1,
          "feedback": "La dependencia de Finca Raíz es la encargada exclusiva de vigilar, legalizar y sanear las escrituras y linderos prediales."
        },
        {
          "question": "Al finalizar una edificación por ingenieros militares, el almacenista general elabora el ingreso soportado en:",
          "options": [
            "Un concepto técnico de reposición del funcionario.",
            "El Acta de Entrega Física y el Acta de Liquidación de Contrato (con planos y desglose de costos).",
            "La póliza de fianza de manejo del contador.",
            "Una declaración de importación con levante aduanero."
          ],
          "correct": 1,
          "feedback": "El egreso de construcciones en curso e ingreso a edificaciones se soporta en las actas de entrega y liquidación de obra."
        },
        {
          "question": "Los predios e instalaciones del Ministerio de Defensa destinados a futuras ampliaciones se registran en la cuenta:",
          "options": [
            "Edificaciones terminadas.",
            "Terrenos.",
            "Bienes en control administrativo.",
            "Activos intangibles en fase de desarrollo."
          ],
          "correct": 1,
          "feedback": "Los lotes de tierra vacíos o destinados a futuras bases militares se registran contablemente en la cuenta 'Terrenos'."
        },
        {
          "question": "¿Qué ocurre con los terrenos de uso militar que carecen de escrituración definitiva debido a disputas legales de linderos?",
          "options": [
            "Se regalan a los colindantes civiles.",
            "Se registran provisionalmente en cuentas de orden deudoras hasta que la autoridad judicial dictamine la propiedad.",
            "Se cargan al gasto general de consumo del periodo.",
            "Se eliminan de SILOG e Instrumentos Públicos."
          ],
          "correct": 1,
          "feedback": "Cualquier predio en litigio o sin saneamiento legal se controla en cuentas de orden deudoras, protegiendo la soberanía del bien."
        },
        {
          "question": "Las redes de distribución, cables, acueductos y líneas de interconexión militar son:",
          "options": [
            "Activos intangibles de telemática.",
            "Bienes inmuebles (Redes, líneas y cables).",
            "Bienes con control administrativo < 50 UVT.",
            "Inventarios de consumo ordinario."
          ],
          "correct": 1,
          "feedback": "El tendido eléctrico, tuberías y cableado estructurado se clasifican contablemente como Bienes Inmuebles de Redes e Infraestructura."
        },
        {
          "question": "La adición de un nuevo piso de oficinas a un edificio militar existente se registra como:",
          "options": [
            "Gasto operativo del periodo de construcción.",
            "Mayor valor del activo (Edificaciones) capitalizando la adición previa liquidación de obra.",
            "Cuentas de orden transitorias de aduana.",
            "Inventario en bodega de producto terminado."
          ],
          "correct": 1,
          "feedback": "Las ampliaciones civiles aumentan la capacidad y valor de la edificación, por lo cual se capitalizan incrementando el costo del activo."
        },
        {
          "question": "¿Quién debe validar que las especificaciones físicas de una obra terminada coincidan con los planos de ingeniería?",
          "options": [
            "El almacenista de remonta.",
            "El supervisor técnico de la obra y los ingenieros constructores.",
            "El perito de seguros del ecónomo.",
            "El Contador General de la Nación."
          ],
          "correct": 1,
          "feedback": "La interventoría o supervisión de obra es responsable de certificar que el edificio cumple con los planos y normas técnicas de construcción."
        },
        {
          "question": "El Catastro Predial de la fuerza militar tiene como función principal:",
          "options": [
            "Liquidación de extintores y equipos contra incendios.",
            "Mantener un inventario físico, cartográfico e historial de linderos de todos los terrenos del Ministerio.",
            "Aprobar las planillas de economato diariamente.",
            "Almacenar las crías de semovientes."
          ],
          "correct": 1,
          "feedback": "El catastro militar consolida la georreferenciación, escrituras y linderos prediales para evitar invasiones o detrimentos."
        },
        {
          "question": "Las construcciones militares en curso deben ser auditadas físicamente con qué frecuencia por Finca Raíz:",
          "options": [
            "Semanalmente",
            "Mensualmente",
            "Semestral o anualmente de acuerdo con el plan de control",
            "No se requiere auditar las obras en curso"
          ],
          "correct": 2,
          "feedback": "Finca Raíz y la interventoría realizan visitas de control periódicas (semestrales/anuales) para avalar el avance real del presupuesto de obra."
        },
        {
          "question": "Una bodega modular ensamblada sobre bases de concreto fijas se clasifica como:",
          "options": [
            "Bienes muebles en bodega nuevos.",
            "Inmueble por adhesión (Edificaciones).",
            "Inventario consumible de repuestos.",
            "Activo intangible de telemática."
          ],
          "correct": 1,
          "feedback": "Al anclarse a bases fijas de concreto de forma permanente para prestar servicio, se cataloga como edificación por adhesión."
        },
        {
          "question": "¿Qué trámite aduanero y catastral exige el manual al adquirir un predio en el extranjero para una embajada militar?",
          "options": [
            "Registrarlo en las cuentas de orden de la DIAN local.",
            "Escrituración conforme a leyes del país origen, registro consular e incorporación en la Finca Raíz nacional.",
            "Cargarse de forma directa al gasto de consumo de la fuerza.",
            "Las fuerzas militares tienen estrictamente prohibido poseer predios en el extranjero."
          ],
          "correct": 1,
          "feedback": "Las compras en el exterior se legalizan bajo normas del país anfitrión y se reportan al consulado para su incorporación patrimonial."
        },
        {
          "question": "El Acta de Liquidación de Obra de una edificación debe incluir de forma obligatoria:",
          "options": [
            "Las ofertas de los proveedores rechazados.",
            "El desglose de costos reales de materiales, mano de obra y firmas de los ingenieros interventores.",
            "La póliza de fianza de manejo del ecónomo.",
            "El TRM a la fecha de la licitación."
          ],
          "correct": 1,
          "feedback": "La liquidación exige transparencia total en los desembolsos y firmas que avalen la idoneidad y entrega de la estructura."
        },
        {
          "question": "Los terrenos 'Ejidos' que son transferidos al Ministerio de Defensa por un municipio ingresan mediante:",
          "options": [
            "Ajuste contable por depreciación lineal.",
            "Entrada de almacén por donación soportada en la resolución de cesión gratuita de la alcaldía.",
            "Se cargan directamente al gasto contable sin escrituración.",
            "El manual prohíbe recibir terrenos de origen ejido."
          ],
          "correct": 1,
          "feedback": "Las cesiones gratuitas municipales ingresan al patrimonio con Entrada por donación basada en el acuerdo municipal de cesión."
        },
        {
          "question": "Si se realiza un mantenimiento preventivo de pintura en un edificio militar, este costo se registra como:",
          "options": [
            "Mayor valor de la edificación capitalizándose como adición.",
            "Gasto de conservación y mantenimiento del periodo (no capitalizable).",
            "Cuentas de orden deudoras de telemática.",
            "Inventario en bodega de producto terminado."
          ],
          "correct": 1,
          "feedback": "El mantenimiento rutinario (como pintura o limpieza de techos) no aumenta la vida útil ni la capacidad operativa; se registra como gasto."
        },
        {
          "question": "¿Qué ocurre con los linderos de un Cantón Militar que son invadidos por particulares?",
          "options": [
            "Se regala el área invadida a los civiles.",
            "Se reporta de inmediato a la Oficina de Finca Raíz y al Ordenador del Gasto para iniciar las acciones legales de restitución de bien de uso público.",
            "Se realiza un ajuste por faltantes de terrenos en SILOG.",
            "No se requieren acciones legales."
          ],
          "correct": 1,
          "feedback": "Cualquier invasión predial atenta contra el patrimonio del Estado y exige el inicio inmediato de acciones policivas o penales de restitución."
        },
        {
          "question": "La base de datos unificada de Finca Raíz militar debe conciliar sus datos semestralmente con:",
          "options": [
            "La Oficina de Registro de Instrumentos Públicos y el Instituto Geográfico Agustín Codazzi (IGAC).",
            "Los talleres de repuestos serviciables de la Base Naval.",
            "La póliza de seguros de manejo del contador.",
            "El banco de preguntas de la evaluación del curso."
          ],
          "correct": 0,
          "feedback": "Finca Raíz debe confrontar periódicamente linderos y escrituras contra la oficina de catastro nacional (IGAC) e Instrumentos Públicos."
        }
      ]
    },
    {
      "id": 7,
      "num": "VII",
      "title": "Procedimiento Contable",
      "subtitle": "Cuentas de Inventario y PPYE, Dinámica de Registros y Conciliaciones",
      "header": {
        "purpose": "Establecer la dinámica contable de debitación y acreditación para hechos económicos de inventarios, propiedades, planta y equipo, cuentas de orden de control administrativo e incautaciones.",
        "difficulty": "Avanzado",
        "competencies": [
          "Aplicar con precisión las dinámicas contables del Catálogo General de Cuentas para Entidades de Gobierno.",
          "Registrar contablemente la incorporación patrimonial, traslados, bajas, depreciación y amortización de activos.",
          "Estructurar y auditar actas de conciliación contable cruzando libros contra reportes físicos de SILOG."
        ],
        "expectedResult": "Al finalizar, el estudiante podrá procesar asientos contables de ingresos y bajas, auditar la amortización mensual de intangibles y conciliar balances financieros."
      },
      "objectives": {
        "general": "Garantizar la representación fiel y relevancia de la información contable del Ministerio de Defensa de acuerdo con la normatividad de la CGN.",
        "specifics": [
          "Describir la dinámica de las cuentas de Inventario (Grupo 15) y Propiedades (Grupo 16).",
          "Analizar el registro contable de las cuentas de orden deudoras de control logístico.",
          "Establecer la secuencia de conciliación entre Contabilidad y Almacén."
        ],
        "procedural": "Procesar débitos y créditos contables para adiciones y bajas, calcular amortizaciones de software y conciliar el balance general.",
        "conceptual": "Comprender la responsabilidad legal que asume el contador en la representación contable del patrimonio de las Fuerzas."
      },
      "map": {
        "mainTopic": "Registro Contable y Control de Activos",
        "subtopics": [
          "Catálogo de Cuentas Contables",
          "Dinámica de Inventarios y PPYE",
          "Cuentas de Orden y Gasto",
          "Procedimiento de Conciliación"
        ],
        "concepts": [
          "Asiento contable de ingreso",
          "Depreciación acumulada",
          "Amortización de intangibles",
          "Ajuste por conciliación"
        ],
        "procedures": [
          "Registro contable de adquisiciones nacionales",
          "Depreciación lineal mensual",
          "Conciliación de saldos contables"
        ],
        "documents": [
          "Catálogo General de Cuentas Contables públicas",
          "Comprobante diario de contabilidad",
          "Balance de prueba de la fuerza",
          "Acta de conciliación contable"
        ],
        "actors": [
          "Jefe de Contabilidad",
          "Contador de la fuerza",
          "Almacenista",
          "Auditor de la Contraloría"
        ],
        "controls": [
          "Conciliación contable obligatoria al 100% de saldos mensuales",
          "Auditorías de la Contraloría General de la República",
          "Plaqueado e inventario físico cruzado"
        ],
        "exceptions": [
          "Bienes de armamento y semovientes se capitalizan en el Grupo 16 como Propiedades, Planta y Equipo sin importar que su costo sea menor a 50 UVT."
        ]
      },
      "temario": [
        {
          "title": "7.1 Catálogo General de Cuentas del Gobierno",
          "explanation": "El procedimiento contable para el manejo de bienes en el sector Defensa se rige de forma obligatoria bajo los lineamientos del Catálogo General de Cuentas para Entidades de Gobierno emitido por la Contaduría General de la Nación (CGN). Los activos se parametrizan en el sistema SILOG y se causan en SIIF en los siguientes grupos contables:\n\n1. **Grupo 15 (Inventarios)**: Afecta materias primas, materiales de consumo y repuestos menores en bodega.\n2. **Grupo 16 (Propiedades, Planta y Equipo)**: Afecta terrenos, edificaciones, armamento de guerra, vehículos y maquinaria en servicio o bodega.\n3. **Cuenta 1685 (Depreciación Acumulada)** y **Cuenta 1970 (Activos Intangibles)**.",
          "concepts": [
            {
              "name": "Grupo 15",
              "desc": "Clasificación contable para los activos de consumo, materias primas y mercancías."
            },
            {
              "name": "Grupo 16",
              "desc": "Clasificación contable para propiedades, terrenos, hangares, armamento y vehículos."
            }
          ],
          "reference": "Capítulo VII, Sección 7.1"
        },
        {
          "title": "7.2 Dinámica de Registros Contables",
          "explanation": "La dinámica contable de registro de hechos económicos se procesa bajo el principio universal de la Partida Doble contable, afectando los saldos mediante débitos y créditos:\n\n1. **Débitos (Ingresos / Aumentos)**: Se debitan las cuentas del activo al elaborar Entradas de Almacén por compra nacional o exterior, reingreso de piezas serviciables, incorporación de sobrantes, donaciones u obras terminadas.\n2. **Créditos (Egresos / Disminuciones)**: Se acreditan al formalizar Salidas de Almacén por consumo de materiales, actas de traslados a otras unidades, depreciación periódica mensual o actas de bajas de bienes inservibles.",
          "reference": "Capítulo VII, Sección 7.2"
        },
        {
          "title": "7.3 Cuentas de Orden y Gasto Especial",
          "explanation": "Para controlar responsabilidades, garantías y hechos económicos que no afectan el balance de activos inmediatos, el manual estipula el registro obligatorio en Cuentas de Orden:\n\n1. **Bienes < 50 UVT (Bienes de Control Administrativo)**: Se cargan contablemente al gasto de la vigencia (Clase 5: Gastos operativos), pero se registran de manera obligatoria en Cuentas de Orden Deudoras (Grupo 83) para mantener su trazabilidad física en SILOG.\n2. **Bienes Incautados / En Custodia**: Elementos aprehendidos provisionalmente en operaciones militares. Se controlan en Cuentas de Orden transaccionales hasta que se defina su decomiso final o devolución legal.",
          "reference": "Capítulo VII, Sección 7.3"
        },
        {
          "title": "7.4 El Procedimiento de Conciliación de Saldos",
          "explanation": "El procedimiento de conciliación contable de saldos es el mecanismo de auditoría interna más crítico. Mensualmente, el Jefe de Almacén y el Contador de la Unidad deben confrontar el inventario logístico valorado emitido por SILOG contra el balance de comprobación contable de SIIF. De este cruce es obligatorio levantar y firmar con tinta un Acta de Conciliación Contable Mensual. Si existen diferencias residuales (por tránsitos de mercancías o demoras de radicación), se deben detallar y registrar las correcciones necesarias antes de generar los reportes financieros oficiales para la Contaduría General.",
          "reference": "Capítulo VII, Sección 7.4"
        }
      ],
      "resumen": {
        "purpose": "Normar la representación contable fiel y la dinámica financiera de los activos de las Fuerzas.",
        "concepts": "Partida doble contable, cuentas de balance general, cuentas de orden, cuentas de gasto.",
        "procedures": "Causación de ingresos por contratos, registro mensual de depreciaciones acumuladas, conciliación SIIF-SILOG.",
        "responsibilities": "El Contador procesa las causaciones y ajustes; el Almacenista aporta los reportes valorados; el Oficial de Control Interno supervisa los saldos.",
        "documents": "Balance de Prueba, Comprobante Diario de Contabilidad, Acta de Conciliación Mensual.",
        "controls": "Auditoría obligatoria de la Contraloría; prohibición absoluta de asentar transacciones contables sin documento de soporte (factura o acta).",
        "mistakes": "Cometer la omisión de no registrar la depreciación de un lote de vehículos blindados activos, distorsionando el balance patrimonial de la fuerza."
      },
      "glosario": [
        {
          "term": "Débito",
          "definition": "Registro de ingresos, adiciones o mayor valor patrimonial en las cuentas del activo contable.",
          "ref": "Sección 7.2"
        },
        {
          "term": "Crédito",
          "definition": "Registro de salidas, bajas o desgaste acumulado en las cuentas del activo contable.",
          "ref": "Sección 7.2"
        },
        {
          "term": "Cuentas de Orden",
          "definition": "Cuentas transaccionales que controlan responsabilidades o contingencias sin afectar el balance financiero patrimonial.",
          "ref": "Sección 7.3"
        },
        {
          "term": "Conciliación Contable",
          "definition": "Proceso mensual obligatorio de confrontación de saldos contables de SIIF contra inventarios logísticos de SILOG.",
          "ref": "Sección 7.4"
        }
      ],
      "practica": {
        "context": "Auditoría y Conciliación Contable de Fin de Mes",
        "scenario": "En el área financiera de la Dirección de Finanzas de la Unidad Ejecutora se realiza la conciliación mensual contable-almacén. El Balance de Prueba contable en SIIF Nación registra un saldo en el activo 1635 'Bienes muebles en bodega' de $450.000.000 COP, mientras que el reporte valorado de inventarios de SILOG arroja un saldo de $442.000.000 COP. Se debe detectar y conciliar la diferencia.",
        "data": "Detalle de transacciones:\n- Saldo SIIF: $450.000.000 COP.\n- Saldo SILOG: $442.000.000 COP.\n- Hallazgo de auditoría: 1 factura por repuestos de $8.000.000 COP fue radicada y causada contablemente en SIIF el 28 de mes, pero el material llegó físicamente e ingresó a SILOG el 2 de mes siguiente.",
        "questions": [
          "¿A qué corresponde la diferencia de $8.000.000 COP detectada?",
          "¿Cómo se debe reflejar esta diferencia en el Acta de Conciliación Mensual?",
          "¿Qué asiento contable o ajuste procede en SILOG al ingresar el material?"
        ],
        "steps": [
          "Solicitar el Balance de Prueba de Contabilidad y el Reporte de Existencias Valorado de SILOG.",
          "Comparar fila por fila las transacciones registradas en ambos sistemas durante el mes.",
          "Identificar la factura pendiente por ingreso físico en bodega.",
          "Elaborar el Acta de Conciliación Mensual justificando la diferencia por 'Bienes en Tránsito' o retraso en almacén, y firmar el acta."
        ],
        "criteria": "Identificación plena de la procedencia de las diferencias de inventario y estructuración correcta del acta de conciliación obligatoria.",
        "solution": "1. Explicación de la Diferencia: La diferencia de $8.000.000 COP corresponde a una transacción en tránsito. El área contable causó la factura radicada del proveedor antes de que el almacén recibiera físicamente el material e hiciera el ingreso en SILOG.\n2. Acta de Conciliación: Se debe levantar el acta mensual detallando el saldo de ambos sistemas y justificando la diferencia de $8.000.000 COP bajo la observación 'Bienes devengados en tránsito de llegada'. El acta se firma en tinta por el almacenista y contador.\n3. Ajuste: No procede ajuste de error en libros. Al llegar físicamente el material el día 2 del mes siguiente, el almacenista elabora la Entrada de Almacén ordinaria en SILOG por $8.000.000 COP, conciliando automáticamente los saldos de ambos sistemas para el siguiente corte mensual."
      },
      "bancoPreguntas": [
        {
          "question": "¿Qué entidad oficial emite el Catálogo General de Cuentas y las políticas contables públicas aplicables al MDN?",
          "options": [
            "La Contraloría General de la República.",
            "La Contaduría General de la Nación.",
            "El Ministerio de Hacienda y Crédito Público.",
            "La Jefatura Logística del Comando General."
          ],
          "correct": 1,
          "feedback": "La Contaduría General de la Nación (CGN) es la autoridad máxima contable del estado colombiano rectora de las cuentas gubernamentales."
        },
        {
          "question": "El registro contable del ingreso de un activo al patrimonio mediante compra se realiza afectando:",
          "options": [
            "Un crédito en la cuenta del activo 1635.",
            "Un débito en la cuenta del activo (Grupo 16 o 15) contra su respectiva contrapartida financiera.",
            "Una nota de gasto contable Clase 5 de manera exclusiva.",
            "Únicamente cuentas de orden deudoras del Grupo 83."
          ],
          "correct": 1,
          "feedback": "Los ingresos se debitan en las cuentas de balance de activos, incrementando el patrimonio de la entidad."
        },
        {
          "question": "La salida definitiva de un bien devolutivo por baja en cuenta de inservibles se asienta mediante:",
          "options": [
            "Un débito en la cuenta 1635 y crédito en gasto contable.",
            "Un crédito en la cuenta de activo correspondiente (reduciendo el patrimonio) contra la cuenta de pérdida o retiro.",
            "Un ajuste directo en el Catálogo General de Cuentas.",
            "Únicamente el registro en la remonta de semovientes."
          ],
          "correct": 1,
          "feedback": "Las bajas y egresos definitivos de bienes se acreditan en las cuentas de activos para dar salida formal al saldo en libros."
        },
        {
          "question": "¿En qué cuenta contable se controlan los bienes de consumo comprados para consumo y bodega?",
          "options": [
            "Grupo 16 Propiedades, Planta y Equipo.",
            "Grupo 15 Inventarios.",
            "Grupo 83 Cuentas de orden deudoras.",
            "Clase 5 Gastos de depreciación acumulada."
          ],
          "correct": 1,
          "feedback": "Los elementos consumibles, repuestos y existencias de bodega para consumo directo se controlan contablemente en el Grupo 15 (Inventarios)."
        },
        {
          "question": "Los bienes muebles de cuantía inferior a 50 UVT que no son armamento se registran contablemente en:",
          "options": [
            "Cuenta 1635 Bienes muebles de propiedades, planta y equipo.",
            "Cuentas de gasto (Clase 5) en el periodo de adquisición, controlándose en SILOG en cuentas de orden (Grupo 83).",
            "Cuentas de inventario de producto terminado.",
            "No se registran en contabilidad ni en SILOG."
          ],
          "correct": 1,
          "feedback": "Los devolutivos de bajo costo (< 50 UVT) se llevan directamente al gasto en contabilidad contable, controlándose administrativamente en SILOG."
        },
        {
          "question": "¿Qué representa la cuenta contable 1685 en el balance patrimonial de la fuerza?",
          "options": [
            "El valor comercial de las licencias de software.",
            "La depreciación acumulada del activo (cuenta correctora del activo con saldo crédito).",
            "El total acumulado de construcciones de hangares en curso.",
            "Los combustibles de aviación en tránsito."
          ],
          "correct": 1,
          "feedback": "La cuenta 1685 registra la depreciación acumulada del activo; es una cuenta de saldo crédito que reduce el valor neto del PPYE en balance."
        },
        {
          "question": "La amortización acumulada de los activos intangibles de vida útil finita se asienta en la cuenta:",
          "options": [
            "Cuenta 1510 Inventario en bodega.",
            "Cuenta 1970 Amortización acumulada de activos intangibles (saldo crédito).",
            "Cuenta 8390 Cuentas de orden incautadas.",
            "Gasto por depreciación de terrenos."
          ],
          "correct": 1,
          "feedback": "El desgaste o amortización de intangibles se acredita en la cuenta correctora de amortización acumulada (Grupo 19)."
        },
        {
          "question": "El balance de prueba es un reporte contable emitido a través del sistema:",
          "options": [
            "SILOG-SAP.",
            "SIIF Nación.",
            "Excel del almacenista general.",
            "La Junta de Bajas militar."
          ],
          "correct": 1,
          "feedback": "El SIIF Nación es el sistema oficial gubernamental financiero a través del cual se asientan registros y emiten balances contables de la fuerza."
        },
        {
          "question": "¿Con qué frecuencia se debe levantar y firmar el Acta de Conciliación Mensual contabilidad-almacén?",
          "options": [
            "Semanalmente",
            "Mensualmente de forma obligatoria",
            "Únicamente al cierre de la vigencia fiscal el 31 de diciembre",
            "Bimensualmente con el peritaje de seguros"
          ],
          "correct": 1,
          "feedback": "La conciliación de saldos exige un proceso de auditoría y firma de actas de forma obligatoria todos los meses del año."
        },
        {
          "question": "Está estrictamente prohibido asentar registros de débitos o créditos contables de activos sin:",
          "options": [
            "Un documento de soporte formal e idóneo (factura electrónica, actas de supervisor o resoluciones de baja).",
            "La fianza de manejo del perito aduanero.",
            "El plaqueado alfanumérico previo de la bodega de remonta.",
            "La autorización escrita de la aseguradora del ecónomo."
          ],
          "correct": 0,
          "feedback": "Todo registro contable de hechos económicos exige un soporte legal de soporte formal (factura, resolución, actas) para cumplir el control."
        },
        {
          "question": "¿Qué tipo de cuenta se utiliza para registrar de forma transitoria las incautaciones en operativos?",
          "options": [
            "Cuenta 1635 Bienes muebles.",
            "Cuentas de orden deudoras (Grupo 83).",
            "Cuentas de gasto Clase 5 de depreciación.",
            "Inventarios de producto terminado."
          ],
          "correct": 1,
          "feedback": "Las incautaciones no son activos propios y se registran en cuentas de orden deudoras transaccionales para control custodial."
        },
        {
          "question": "¿Qué ocurre contablemente cuando un bien incautado recibe fallo en firme de Decomiso Judicial?",
          "options": [
            "Se regala al batallón de ingenieros.",
            "Se da de baja de cuentas de orden y se ingresa formalmente debitando la cuenta de activo patrimonial respectivo.",
            "Se carga al gasto de la Clase 5 del periodo actual.",
            "No sufre variación, permanece en cuentas de orden indefinidamente."
          ],
          "correct": 1,
          "feedback": "El decomiso judicial permite legalizar la propiedad del bien trasladándolo desde cuentas de orden al activo patrimonial de la fuerza."
        },
        {
          "question": "La conciliación contabilidad-almacén tiene como meta principal:",
          "options": [
            "Determinar el costo de reposición de motores serviciables.",
            "Garantizar que los saldos financieros del balance en SIIF coincidan al 100% con el inventario físico valorado en SILOG, justificando diferencias.",
            "Plaquear administrativamente los estantes de economato.",
            "Liquidar la póliza de manejo del almacenista de armamento."
          ],
          "correct": 1,
          "feedback": "La conciliación busca garantizar la veracidad, relevancia y correspondencia absoluta de saldos entre inventario logístico y libros contables."
        },
        {
          "question": "¿Qué cuenta del pasivo o patrimonio se afecta en contrapartida al ingresar un bien recibido en Donación?",
          "options": [
            "Cuenta de gastos Clase 5 por depreciaciones.",
            "Cuenta de ingreso patrimonial (donaciones/transferencias sin contraprestación).",
            "Cuentas de orden deudoras transaccionales.",
            "Cuenta de pasivos por compra en el exterior."
          ],
          "correct": 1,
          "feedback": "El ingreso del bien recibido gratis por donación tiene como contrapartida una cuenta de ingreso patrimonial por transferencias sin contraprestación."
        },
        {
          "question": "Las adiciones y mejoras capitalizadas de activos de PPYE se registran contablemente debitando:",
          "options": [
            "La cuenta correctora de depreciación acumulada 1685.",
            "La respectiva cuenta del activo incrementando su costo histórico.",
            "La cuenta de gasto por conservación y mantenimiento del periodo.",
            "Las cuentas de orden de control de TICs."
          ],
          "correct": 1,
          "feedback": "Al capitalizarse la adición, se debita el costo del activo principal elevando su valor patrimonial en libros."
        },
        {
          "question": "¿Qué profesional del área financiera es el responsable legal de autorizar y asentar los comprobantes diarios de contabilidad en SIIF?",
          "options": [
            "El Almacenista titular de la Unidad.",
            "El Contador de la fuerza debidamente matriculado.",
            "El Oficial Supervisor de la Junta de Bajas.",
            "El proveedor contratado por licitación."
          ],
          "correct": 1,
          "feedback": "El contador público asignado es el único funcionario autorizado legalmente para asentar asientos y refrendar balances en el sistema."
        },
        {
          "question": "Si se detecta un error de digitación en el ingreso de un bien en SILOG de un mes ya cerrado contablemente, se debe:",
          "options": [
            "Borrar el registro anterior en SILOG ocultando el error.",
            "Realizar una nota contable de ajuste autorizada por el contador y el jefe de almacén justificando la corrección.",
            "Ignorar el error cargando el valor a la póliza del ecónomo.",
            "No se permiten hacer ajustes de meses cerrados contablemente."
          ],
          "correct": 1,
          "feedback": "Los periodos cerrados se ajustan mediante notas de contabilidad debidamente justificadas y firmadas por los responsables."
        },
        {
          "question": "Los inventarios de materias primas e insumos en la fábrica de confecciones de dotaciones se debitan en la cuenta del:",
          "options": [
            "Grupo 16 de PPYE.",
            "Grupo 15 (Inventarios - Materias Primas).",
            "Clase 5 de depreciación acumulada.",
            "Cuentas de orden de Finca Raíz."
          ],
          "correct": 1,
          "feedback": "Las materias primas en talleres se controlan en las cuentas específicas de inventarios (Grupo 15) hasta su transformación definitiva."
        },
        {
          "question": "El balance patrimonial consolidated del Ministerio de Defensa Nacional se presenta anualmente ante:",
          "options": [
            "El Comando General y la Contaduría General de la Nación para su consolidación en el Balance General del Estado.",
            "Los talleres de mantenimiento de vehículos blindados de Cartagena.",
            "La compañía de seguros encargada de las pólizas de manejo.",
            "No se requiere consolidar los balances del sector Defensa."
          ],
          "correct": 0,
          "feedback": "Los estados consolidados se reportan a la Contaduría General para estructurar la Cuenta General del Presupuesto de la Nación."
        },
        {
          "question": "La conciliación de saldos contables del combustible gestionado en SILOG-SAP exige contrastar:",
          "options": [
            "El consumo diario registrado contra los balances de contabilidad contable de compras de combustibles.",
            "La póliza de fianza del almacenista entrante contra el inventario de semovientes.",
            "Las planillas de relevo saliente contra el manual de linderos.",
            "La evaluación del Examen Final general."
          ],
          "correct": 0,
          "feedback": "El control contable del combustible requiere cruzar los consumos informados en el módulo SILOG-SAP contra los pagos de compras en el SIIF."
        }
      ]
    }
  ]
};
