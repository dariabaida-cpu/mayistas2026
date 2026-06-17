import { useState, useEffect, useMemo } from "react";

const DAYS = [
  { id: "dom28", label: "Domingo 28 de junio", short: "28 jun" },
  { id: "lun29", label: "Lunes 29 de junio", short: "29 jun" },
  { id: "mar30", label: "Martes 30 de junio", short: "30 jun" },
  { id: "mie01", label: "Miércoles 1 de julio", short: "1 jul" },
  { id: "jue02", label: "Jueves 2 de julio", short: "2 jul" },
  { id: "vie03", label: "Viernes 3 de julio", short: "3 jul" },
  { id: "sab04", label: "Sábado 4 de julio", short: "4 jul" },
];

const SCHEDULE = [
  // === DOMINGO 28 ===
  {
    day: "dom28",
    id: "s0-plenaria",
    title: "Ceremonia de inauguración",
    type: "plenaria",
    room: "Teatro Benemérito Instituto Campechano",
    talks: [
      { id: "t0-1", time: "17:00", title: "Ceremonia de inauguración", authors: [] },
      { id: "t0-2", time: "18:00", title: "Desde altamar y Puerta de Tierra: rostros campechanos, miradas viajeras", authors: ["Ruz Sosa, Mario Humberto"] },
      { id: "t0-3", time: "19:00", title: "Recepción", authors: [] },
    ]
  },
  // === LUNES 29 ===
  {
    day: "lun29", id: "s1", title: "Simposio: Investigaciones recientes en Calakmul y la región norte del Petén",
    type: "sesion", room: "Aula 1", time: "9:00–12:30",
    talks: [
      { id: "t1-1", time: "9:00", title: "Dinámicas de ocupación posclásica y de contacto en la región de Calakmul y El Mirador", authors: ["Kupprat, Felix", "Morales Aguilar, Carlos", "Walker, Debra S."] },
      { id: "t1-2", time: "9:30", title: "Juun Ajaw cazando en el agua: ¿una escena mítica en Calakmul marcada por un signo calendárico?", authors: ["Salazar Lama, Daniel", "García Barrios, Ana", "Esqueda Lazo de la Vega, Benjamín"] },
      { id: "t1-3", time: "10:00", title: "Cuatrocientos años de relación tumultuosa entre Naachtun y Calakmul", authors: ["Nondédéo, Philippe", "Grube, Nikolai"] },
      { id: "t1-4", time: "10:30", title: "Estudio estilístico de un vaso estilo códice procedente de Calakmul", authors: ["García Barrios, Ana", "Velázquez Morlet, Adriana", "Salazar Lama, Daniel"] },
      { id: "t1-5", time: "11:00", title: "Calakmul antes de los Kanu'l: expansión urbana y economías de intercambio", authors: ["Reese-Taylor, Kathryn", "Vázquez López, Verónica Amellali", "Flores Esquivel, Fernando C. Atasta"] },
      { id: "t1-6", time: "12:00", title: "Transformación ambiental y manejo del paisaje en la región del Bajo El Laberinto", authors: ["Anaya Hernández, Armando", "Flores Colín, Alberto Guadalupe"] },
    ]
  },
  {
    day: "lun29", id: "s2", title: "Simposio: Migración, mestizaje y jurisdicción en la provincia de Campeche (siglos XVII-XIX)",
    type: "sesion", room: "Aula 2", time: "9:00–11:30",
    talks: [
      { id: "t2-1", time: "9:00", title: "Movilidad en tiempos virreinales en el Camino Real de Campeche, siglos XVII-XVIII", authors: ["Rocher Salas, Adriana"] },
      { id: "t2-2", time: "9:30", title: "Oratorios de haciendas en Campeche: población y devociones en 1787", authors: ["Medina Suárez, Víctor Hugo"] },
      { id: "t2-3", time: "10:00", title: "Entre ríos y presidio: población y movilidad en la Laguna de Términos, siglos XVIII-XIX", authors: ["Villegas, Pascale"] },
      { id: "t2-4", time: "10:30", title: "Los pueblos del partido de San Antonio: disputa fronteriza entre Campeche y El Petén", authors: ["Torras Conangla, Rosa"] },
      { id: "t2-5", time: "11:00", title: "Transición entre el registro parroquial y el registro civil en Campeche (siglos XVIII-XIX)", authors: ["Wan Moguel, Ricardo Manuel"] },
    ]
  },
  {
    day: "lun29", id: "s3", title: "Simposio: Lenguajes, recursos ambientales y territorio entre los mayas coloniales",
    type: "sesion", room: "Aula 3", time: "9:00–13:00",
    talks: [
      { id: "t3-1", time: "9:00", title: "Territorios cambiantes, relaciones naturaleza-humano, y la reconfiguración de los pueblos de indios en el gran noroeste de la Nueva España, siglos XV-XVII", authors: ["Radding, Cynthia"] },
      { id: "t3-2", time: "9:30", title: "Rutas antiguas, territorios persistentes: intercambio interregional entre la Cuenca de México y Guatemala durante el Posclásico", authors: ["Jiménez González, Berenice", "Acosta Ochoa, Guillermo"] },
      { id: "t3-3", time: "10:00", title: "\"Conquistar y pacificar esta tierra\": territorio y resistencia indígena en la relación de Pedro de Alvarado", authors: ["Eudave Eusebio, Itzá"] },
      { id: "t3-4", time: "10:30", title: "Las relaciones indígenas de compadrazgo al final del siglo XVI: ejemplos de Tecpán Atitlán y Santiago Atitlán", authors: ["Mallory, Matsumoto"] },
      { id: "t3-5", time: "11:00", title: "Voces mayas y recursos ambientales: conflicto y territorialización en la Verapaz, siglos XVI y XVII", authors: ["Bahena Pérez, Martha Atzin"] },
      { id: "t3-6", time: "12:00", title: "La Historia Natural de Ximénez: comunicación política y gestión de recursos en pueblos de indios", authors: ["Contreras Romero, Rebeca"] },
      { id: "t3-7", time: "12:30", title: "Pueblos de indios en la audiencia de Guatemala en la reconfiguración del poder local", authors: ["López Velásquez, Eugenia"] },
    ]
  },
  {
    day: "lun29", id: "s4", title: "Simposio: Rutas para la conservación del patrimonio y el desarrollo urbano en el área metropolitana de Mérida",
    type: "sesion", room: "Aula 4", time: "9:00–11:30",
    talks: [
      { id: "t4-1", time: "9:00", title: "La conservación del patrimonio y el desarrollo urbano en el área metropolitana de la ciudad de Mérida, Yucatán", authors: ["Ligorred Perramon, Josep"] },
      { id: "t4-2", time: "9:30", title: "La reserva activa: propuestas de desarrollo en zonas de reserva arqueológica para el poniente de Mérida", authors: ["Xuluc Balam, Pedro Rogelio"] },
      { id: "t4-3", time: "10:00", title: "El patrimonio arqueológico en espacios públicos urbanos de la ciudad de Mérida. Red de Parques Arqueológicos", authors: ["Salazar Gamboa, Miguel Ángel", "Ligorred Perramon, Josep"] },
      { id: "t4-4", time: "10:30", title: "Estrategias de reutilización adaptativa frente a la degradación en el Centro Histórico de Mérida", authors: ["Pérez Ortiz, Carla Isabel", "Peraza Rendón, Ana Bertha"] },
      { id: "t4-5", time: "11:00", title: "Rescate de la memoria histórica del excuarto de máquinas de la hacienda Xcunya, Mérida", authors: ["Cárdenas Boldo, Lileana"] },
    ]
  },
  {
    day: "lun29", id: "s5", title: "Mesa: Patrimonio cultural y turismo",
    type: "sesion", room: "Aula 4", time: "12:00–14:00",
    talks: [
      { id: "t5-1", time: "12:00", title: "La construcción simbólica del espacio urbano campechano: modernidad y resignificación de la cultura maya", authors: ["Casanova Rosado, Aida Amine", "García Sandoval, Ivett Magali"] },
      { id: "t5-2", time: "12:30", title: "De la identidad al espectáculo: patrimonio y turismo en el Camino Real de Campeche", authors: ["Urdapilleta Caamal, Ivan"] },
      { id: "t5-3", time: "13:00", title: "Joya de Cerén a 50 años: patrimonio mundial e indiferencia local", authors: ["Escamilla Rodríguez, Marlon"] },
      { id: "t5-4", time: "13:30", title: "Metodologías para diagnóstico y gestión en la conservación del Convento de San Antonio de Padua en Izamal", authors: ["Balam Lara, Rosario Guadalupe", "Canul Canché, Wilson Agustín", "Peraza Rendón, Ana Bertha", "García Solís, Claudia A."] },
    ]
  },
  {
    day: "lun29", id: "s6", title: "Mesa: Narrativa oral y literatura",
    type: "sesion", room: "Aula 5", time: "9:00–11:30",
    talks: [
      { id: "t6-1", time: "9:00", title: "¿Mitos mayas? Los mayas y sus relatos como explicaciones temporales", authors: ["Grana-Behrens, Daniel"] },
      { id: "t6-2", time: "9:30", title: "Cruzando fronteras. Iconicidad y narrativa maya", authors: ["Alejos García, José"] },
      { id: "t6-3", time: "10:00", title: "La palabra y su tránsito. La oralidad en U yóok'otilo'ob áak'ab de Isaac Carrillo Can", authors: ["Martínez Dzul, Álvaro del Jesús"] },
      { id: "t6-4", time: "10:30", title: "Memoria, identidad y formación. Enseñanza de textos mayas coloniales en escenarios diversos", authors: ["León O'Farrill, Israel"] },
      { id: "t6-5", time: "11:00", title: "\"Pablo Montañez\": literatura y compromiso con la selva lacandona en la obra de Pedro Vega Martínez", authors: ["Pérez Suárez, Tomás"] },
    ]
  },
  {
    day: "lun29", id: "s7", title: "Mesa: Tecnologías digitales y enfoques contemporáneos",
    type: "sesion", room: "Aula 5", time: "12:00–13:30",
    talks: [
      { id: "t7-1", time: "12:00", title: "Alux, un anfitrión etéreo de la cultura maya", authors: ["Thompson López, Reynaldo"] },
      { id: "t7-2", time: "12:30", title: "Qfield: una herramienta de uso libre para el registro de patrimonio arqueológico in situ", authors: ["Serrano Roldán, Diana Paulina"] },
      { id: "t7-3", time: "13:00", title: "Ichkabal en 3D: rostros ancestrales y navegación digital entre el estuco y el píxel", authors: ["Thompson López, Reynaldo", "Venegas de la Torre, Luis Joaquín"] },
    ]
  },
  {
    day: "lun29", id: "s8", title: "Mesa: Sociedades e instituciones, siglos XVI-XVIII",
    type: "sesion", room: "Aula 6", time: "9:00–13:30",
    talks: [
      { id: "t8-1", time: "9:00", title: "Las probanzas de méritos del linaje Pech: estrategias retóricas y de legitimación durante el siglo XVI", authors: ["Regueiro Suárez, Pilar"] },
      { id: "t8-2", time: "9:30", title: "Aventuras, infortunios y misterio: movilidad francesa en la península de Yucatán, 1590", authors: ["Ruiz Martínez, Herlinda"] },
      { id: "t8-3", time: "10:00", title: "Leales vasallos de su majestad: el servicio de las milicias mayas y la agencia indígena en la defensa contra la piratería en Yucatán colonial, 1550-1750", authors: ["Chuchiak IV, John F."] },
      { id: "t8-4", time: "10:30", title: "Idolatrías mayas en la documentación inquisitorial", authors: ["Guerrero Gómez, María Elena"] },
      { id: "t8-5", time: "11:00", title: "La venta de las estancias de las cofradías en Yucatán en 1781: el caso de Maxal", authors: ["Suárez Castro, María de Guadalupe"] },
      { id: "t8-6", time: "12:00", title: "Estructura y morfología de las cofradías mayas en la Verapaz, Guatemala, 1650-1780", authors: ["Carrillo González, Juan"] },
      { id: "t8-7", time: "12:30", title: "Resistencia y organización sociopolítica en Tekax, Yucatán (1610): aproximaciones al pensamiento filosófico maya", authors: ["Ceballos Casanova, Belem Alejandra"] },
      { id: "t8-8", time: "13:00", title: "Orden y disidencia en el mundo colonial: rebeliones indígenas y autoridades locales en Chiapas y Yucatán (Siglos XVII-XVIII)", authors: ["Martos Crespo, Joaquín"] },
    ]
  },
  {
    day: "lun29", id: "s9", title: "Simposio: Reproducción social, movilidades y transformaciones comunitarias en pueblos mayas del sur de México",
    type: "sesion", room: "Aula 7", time: "9:00–12:30",
    talks: [
      { id: "t9-1", time: "9:00", title: "La paradoja de la inserción escolar: mantenimiento y desplazamiento de la lengua maya en el ámbito familiar", authors: ["Chi Pech, Jaime Inocencio"] },
      { id: "t9-2", time: "9:30", title: "Justicia indígena maya", authors: ["Buenrostro Alba, Manuel"] },
      { id: "t9-3", time: "10:00", title: "¿Se puede viajar sin mapa por el tiempo?", authors: ["Pérez Castro, Ana Bella"] },
      { id: "t9-4", time: "10:30", title: "Reintegración familiar y comunitaria de migrantes mayas retornados de Estados Unidos a Yucatán", authors: ["Cruz Manjarrez, Adriana"] },
      { id: "t9-5", time: "11:00", title: "Familias laborales agrícolas tseltales en contextos migratorios internos en México", authors: ["García Ortega, Martha"] },
      { id: "t9-6", time: "12:00", title: "Vínculos socioterritoriales para la subsistencia y el afecto en jóvenes mayas de Nunkiní, Campeche", authors: ["Chi Pool, Jair Alberto"] },
    ]
  },
  {
    day: "lun29", id: "s10", title: "Simposio: La costa y la gente del Quintana Roo prehispánico",
    type: "sesion", room: "Aula 8", time: "9:00–13:30",
    talks: [
      { id: "t10-1", time: "9:00", title: "Una cueva funeraria dentro del recinto amurallado de Tulum, Q. Roo", authors: ["Reyes Solís, José Antonio", "Ortega Muñoz, Allan"] },
      { id: "t10-2", time: "9:30", title: "Un incensario tipo Chen Mul rescatado en un adoratorio localizado al interior de un cenote en el ejido Playa del Carmen", authors: ["Reyes Solís, José Antonio", "Velázquez Morlet, Adriana"] },
      { id: "t10-3", time: "10:00", title: "¿Cautivas en El Meco? Evidencias mortuorias en su plaza principal", authors: ["Romero Butrón, Ashuni Emmanuel", "Tho Lam, Gaspar", "Serrano Rivero, Juana Mitzi", "Ortega Muñoz, Allan"] },
      { id: "t10-4", time: "10:30", title: "Hacia una revisión sistemática de las pesquerías de la Costa Oriental: evidencias artefactuales y zooarqueológicas", authors: ["Jiménez Cano, Nayeli G.", "Romero Butrón, Ashuni Emmanuel", "Pantoja Díaz, Luis Raúl"] },
      { id: "t10-5", time: "11:00", title: "Acceso a los recursos alimenticios en dos provincias precolombinas en la Costa Oriental de la península de Yucatán", authors: ["Ortega Muñoz, Allan", "Rand, Asta", "Cucina, Andrea"] },
      { id: "t10-6", time: "12:00", title: "Muyil, un sitio estratégico en la Costa Oriental", authors: ["Alcalá Casteñeda, Enrique"] },
      { id: "t10-7", time: "12:30", title: "El Proyecto Costa Escondida: resultados recientes de la investigación de Vista Alegre, Conil, y la costa norte de Quintana Roo", authors: ["Glover, Jeffrey B."] },
      { id: "t10-8", time: "13:00", title: "Nohichmul: evidencias de ocupación preclásica en la bahía de Chetumal, Quintana Roo", authors: ["Venegas de la Torre, Luis Joaquín", "Pantoja Díaz, Luis Raúl"] },
    ]
  },
  {
    day: "lun29", id: "s11", title: "Mesa: Intercambio e interacción",
    type: "sesion", room: "Aula 9", time: "9:00–11:00",
    talks: [
      { id: "t11-1", time: "9:00", title: "Producción e intercambio de artefactos líticos a corta y media distancia en las Tierras Bajas mayas", authors: ["Torres Marzo, Ricardo"] },
      { id: "t11-2", time: "9:30", title: "Ek Chuah: la deidad del comercio en los Altos Orientales de Chiapas durante el Posclásico Tardío", authors: ["Lowe, Lynneth S.", "Álvarez Asomoza, Carlos Daniel"] },
      { id: "t11-3", time: "10:00", title: "El arte maya de Tula, Hidalgo", authors: ["González Austria Noguez, Liliana"] },
      { id: "t11-4", time: "10:30", title: "Contraste regional en el abastecimiento de obsidiana entre Copán y La Entrada: avances preliminares", authors: ["Ogawa, Masahiro"] },
    ]
  },
  {
    day: "lun29", id: "s12", title: "Simposio: Los mayas de Chiapas: pasado, presente",
    type: "sesion", room: "Aula 9", time: "12:00–14:30",
    talks: [
      { id: "t12-1", time: "12:00", title: "Uso y ritualidad: aproximaciones al contexto funerario de Loma Zorrillo, Chiapas", authors: ["Balderas Correa, María Eugenia"] },
      { id: "t12-2", time: "12:30", title: "Procesos de deificación moderna y paradigmas arcaicos entre los mayas de Chiapas", authors: ["Sheseña Hernández, Alejandro"] },
      { id: "t12-3", time: "13:00", title: "Entre texto y territorio: el Título de Chiapa (ca. 1571) y los paisajes posclásicos de la Depresión Central de Chiapas", authors: ["Annereau Fulbert, Marie"] },
      { id: "t12-4", time: "13:30", title: "Reelaboración simbólica entre los tseltales de Oxchuc, Chiapas: los casos de San Cristóbal y Santo Tomás", authors: ["Castellanos Mora, Alan Antonio"] },
      { id: "t12-5", time: "14:00", title: "\"Estamos ante un hecho histórico\". Antropología, etnicidad y memoria: la recuperación del carnaval tradicional en Oxchuc, Chiapas (2015-2026)", authors: ["Pérez Sánchez, Erick Emmanuel"] },
    ]
  },
  {
    day: "lun29", id: "s-plen1", title: "Mesa plenaria I: Resistir en el territorio",
    type: "plenaria", room: "Auditorio Benemérito Instituto Campechano", time: "17:00–19:00",
    talks: [
      { id: "tp1-1", time: "17:00", title: "Los cenotes: un legado para futuras generaciones", authors: ["Ek Can, Maribel"] },
      { id: "tp1-2", time: "", title: "Abejas: la guardianía del pueblo maya", authors: ["Pech Marín, Leydy Araceli"] },
      { id: "tp1-3", time: "", title: "Impacto socioambiental de granjas porcícolas en comunidades mayas: Santa María Chi", authors: ["Nahuat Puc, Wilberth Alfonso"] },
      { id: "tp1-4", time: "", title: "Justicia, usos y costumbres de las comunidades mayas de Quintana Roo", authors: ["Reyes Hernández, Francisco Javier"] },
    ]
  },
  // === MARTES 30 ===
  {
    day: "mar30", id: "s13", title: "Simposio: El Puuc: nuevos hallazgos, historias y paradigmas",
    type: "sesion", room: "Aula 1", time: "9:00–14:00",
    talks: [
      { id: "t13-1", time: "9:00", title: "La huella del poder en la arquitectura de Uxmal", authors: ["Huchim Herrera, José Guadalupe"] },
      { id: "t13-2", time: "9:30", title: "Escribir la ciudad: epigrafía y surgimiento del linaje K'ak'nal en Uxmal", authors: ["Voss, Alexander W.", "Puga Salazar, Eduardo M."] },
      { id: "t13-3", time: "10:00", title: "Restauración e investigación en el Codz Pop de Kabah", authors: ["Toscano Hernández, María de Lourdes"] },
      { id: "t13-4", time: "10:30", title: "Señores de las colinas: escritura, poder y memoria histórica en Kabah", authors: ["Puga Salazar, Eduardo M.", "Voss, Alexander W."] },
      { id: "t13-5", time: "11:00", title: "Entre tiestos y contextos: la cerámica prehispánica de Uxmal (temporadas 2022-2025)", authors: ["Valencia Santiago, Patricia Yamily", "Huchim Herrera, José Guadalupe", "Cauich Caamal, Héctor Emmanuel"] },
      { id: "t13-6", time: "12:00", title: "Evolución arquitectónica del Palacio de la Serpiente de Uxmal. Estudio preliminar", authors: ["Muñoz Cosme, Gaspar", "Vidal Lorenzo, Cristina", "Huchim Herrera, José Guadalupe", "Horcajada Campos, Patricia"] },
      { id: "t13-7", time: "12:30", title: "Nuevas miradas al Puuc: el registro digital como herramienta para su estudio y conservación", authors: ["Cauich Caamal, Héctor Emmanuel", "Huchim Herrera, José Guadalupe", "Galván Hernández, Jorge Armando"] },
      { id: "t13-8", time: "13:00", title: "Museo Arqueológico del Puuc: gestión, territorio y comunidad (2022-2026)", authors: ["Hernández Peña, Laura Carolina", "Toscano Hernández, María de Lourdes"] },
      { id: "t13-9", time: "13:30", title: "El Museo Virtual de las Mujeres Mayas y el relato sobre la tradición textil en Yucatán", authors: ["Vidal Lorenzo, Cristina", "Horcajada Campos, Patricia", "García López de Andújar, Vanesa"] },
    ]
  },
  {
    day: "mar30", id: "s14", title: "Simposio: Aguada Fénix y la región del Usumacinta Medio",
    type: "sesion", room: "Aula 2", time: "9:00–13:00",
    talks: [
      { id: "t14-1", time: "9:00", title: "Transformaciones sociales y monumentalidad en el Preclásico Medio en la región del Usumacinta Medio", authors: ["Vázquez López, Verónica A.", "Ceballos Pesina, Xanti S.", "Inomata, Takeshi"] },
      { id: "t14-2", time: "9:30", title: "Excavaciones en el grupo E de Aguada Fénix", authors: ["García Hernández, Melina", "Inomata, Takeshi"] },
      { id: "t14-3", time: "10:00", title: "Sistema hidráulico y transformación temprana del paisaje en Aguada Fénix", authors: ["Alvarado León, Claudia Itzel", "García Hernández, Melina", "Flores Esquivel, Fernando C. Atasta", "Inomata, Takeshi"] },
      { id: "t14-4", time: "10:30", title: "Construcción comunitaria y rituales en Aguada Fénix: investigaciones en la Plaza Noroeste", authors: ["Ceballos Pesina, Xanti S."] },
      { id: "t14-5", time: "11:00", title: "La fauna de Aguada Fénix", authors: ["Sharpe, Ashley"] },
      { id: "t14-6", time: "12:00", title: "Fronteras entre la costa del Golfo y las tierras bajas mayas en el Formativo Medio: Pajonal, Tabasco", authors: ["Zanotto, Hannah", "Vázquez López, Verónica A.", "Inomata, Takeshi", "Aoyama, Kazuo"] },
      { id: "t14-7", time: "12:30", title: "Aguada Fénix y la región del Usumacinta medio: transformaciones sociales en el Preclásico Medio Temprano", authors: ["Inomata, Takeshi"] },
    ]
  },
  {
    day: "mar30", id: "s15", title: "Simposio: Origen de las instituciones políticas mayas",
    type: "sesion", room: "Aula 2", time: "13:00–15:00",
    talks: [
      { id: "t15-1", time: "13:00", title: "Marcos teórico-metodológicos para el estudio del origen de las instituciones políticas mayas", authors: ["Izquierdo, Ana Luisa"] },
      { id: "t15-2", time: "13:30", title: "Manteniendo la libertad en los pueblos originarios: reflexiones sobre la monumentalidad formativa hondureña", authors: ["Joyce, Rosemary"] },
      { id: "t15-3", time: "14:00", title: "Imágenes del tiempo perdido: dinámicas sociopolíticas y memoria ancestral en el Uaxactún preclásico", authors: ["Kovac, Milan"] },
      { id: "t15-4", time: "14:30", title: "La forma de gobernar de los primeros reyes de Tak'alik Ab'aj", authors: ["Schieber de Lavarreda, Christa"] },
    ]
  },
  {
    day: "mar30", id: "s16", title: "Simposio: Fuentes para el estudio del área maya durante la época colonial: homenaje a Gudrun Lenkersdorf",
    type: "sesion", room: "Aula 3", time: "9:00–11:00",
    talks: [
      { id: "t16-1", time: "9:00", title: "La etnografía como método de análisis de los títulos k'iche' de la época colonial", authors: ["Flores Hernández, Arcángello Rafael"] },
      { id: "t16-2", time: "9:30", title: "Los mayas en Campeche durante el siglo XVII. Participación en las actividades defensivas y portuarias", authors: ["Reyna Salazar, Paulina"] },
      { id: "t16-3", time: "10:00", title: "Entre el mandato Real y la realidad local. Experiencia judicial y dinamismo del Derecho Indiano en la Audiencia de los Confines", authors: ["Hernández Díaz, Jorge"] },
      { id: "t16-4", time: "10:30", title: "Los tojolabales en la época colonial", authors: ["Castro Segura, Verónica"] },
    ]
  },
  {
    day: "mar30", id: "s17", title: "Mesa: La escritura del dios. Textos y espacios sagrados mayas",
    type: "sesion", room: "Aula 3", time: "12:00–14:00",
    talks: [
      { id: "t17-1", time: "12:00", title: "La memoria de antiguos libros entre los mayas de la península de Yucatán", authors: ["Sullivan, Paul"] },
      { id: "t17-2", time: "12:30", title: "Profecías del Chilam Balam y la invasión y ocupación española de Yucatán", authors: ["Love, Bruce"] },
      { id: "t17-3", time: "13:00", title: "El dragón coronado del Chilam Balam de Kaua: astronomía y escatología en la convergencia entre dos tradiciones", authors: ["Scandar, Florencia"] },
      { id: "t17-4", time: "13:30", title: "Zaculeu: trayectorias de abandono y retorno en un centro milenario de las Tierras Altas mayas", authors: ["Castillo, Victor"] },
    ]
  },
  {
    day: "mar30", id: "s18", title: "Simposio: La práctica de arqueología participativa y herencia comunitaria",
    type: "sesion", room: "Aula 4", time: "9:00–12:30",
    talks: [
      { id: "t18-1", time: "9:00", title: "El Proyecto Comunitario de Tihosuco: estudiando la Guerra de Castas y aprendiendo sobre el siglo XXI", authors: ["Leventhal, Richard M."] },
      { id: "t18-2", time: "9:30", title: "Arqueología e historia en una frontera colonial. Perspectivas desde Tihosuco, Quintana Roo", authors: ["Olán de la Cruz, Fabián Alberto", "Poot Moo, Bartolomé"] },
      { id: "t18-3", time: "10:00", title: "¿Creando La Buena Vista? Preservación del patrimonio y los cambios por la práctica arqueológica", authors: ["Diserens Morgan, Kasey"] },
      { id: "t18-4", time: "10:30", title: "Contando y repartiendo historias de la repoblación y memoria de guerra en Tihosuco, Quintana Roo", authors: ["Chan Canché, Marcelina"] },
      { id: "t18-5", time: "11:00", title: "Museo comunitario \"La huella de nuestros ancestros\" de Tihosuco: retos y perspectivas", authors: ["Chab Cahum, Livia Marbella", "Balam Poot, Yessica Valentina", "Chi Balam, Gelmy Rubi", "Tec Cahun, Carlos Eduardo"] },
      { id: "t18-6", time: "12:00", title: "La práctica de arqueología participativa y herencia comunitaria: considerando historias difíciles, honrando la tierra y diseñando el futuro", authors: ["Fryer, Tiffany C.", "Pat Chi, Lorenzo"] },
    ]
  },
  {
    day: "mar30", id: "s19", title: "Simposio: Perspectivas interdisciplinarias sobre la cocina maya",
    type: "sesion", room: "Aula 5", time: "9:00–13:00",
    talks: [
      { id: "t19-1", time: "9:00", title: "Al sabor de los sentidos. Sensorialidad y materialidad de la cocina maya", authors: ["Novelo Pérez, María Jesús"] },
      { id: "t19-2", time: "9:30", title: "Moler y cocinar. Técnicas de procesamiento de alimentos a partir del análisis de granos de almidón en metates y manos de Calakmul", authors: ["Poot Franco, Paulina Ivette"] },
      { id: "t19-3", time: "10:00", title: "Sabores del Clásico: el papel de los animales vertebrados en la dieta maya de centro y sur de Campeche", authors: ["Rivas Romero, Javier Adrián"] },
      { id: "t19-4", time: "10:30", title: "Del k'oben al k'aax: prácticas de consumo doméstico de leña en un grupo residencial del Puuc en el Clásico Terminal", authors: ["Castillo Acal, David Armando"] },
      { id: "t19-5", time: "11:00", title: "La arquitectura para cocinar: la cocina maya como dispositivo integral y espacial de la cultura", authors: ["Torres Pérez, María Elena"] },
      { id: "t19-6", time: "12:00", title: "Hacer Píib: de lo sagrado al marketing y turismo gastronómico", authors: ["Velázquez Solís, Alberto Carlos", "Cetina Catzín, Adrián de Jesús"] },
      { id: "t19-7", time: "12:30", title: "Saberes que se cocinan: enseñanza y transmisión de la cocina maya en contextos contemporáneos", authors: ["Cocom Rogel, Iliane Gishel", "Escalante Kuk, José Trinidad"] },
    ]
  },
  {
    day: "mar30", id: "s20", title: "Simposio: Complejidad social en el área maya",
    type: "sesion", room: "Aula 6", time: "9:00–11:30",
    talks: [
      { id: "t20-1", time: "9:00", title: "Complejidades sociales de la esquina noroccidental del norte de la península de Yucatán. El sitio arqueológico de Chel", authors: ["Casares Contreras, Orlando Josué"] },
      { id: "t20-2", time: "9:30", title: "La vida en los suburbios de Ichkaantiho: la cerámica de Polook Keej", authors: ["Pérez de Heredia Puente, Eduardo José"] },
      { id: "t20-3", time: "10:00", title: "Caracterización de un sitio de rango IV del norte de Yucatán: Polok Kéej, caso de estudio", authors: ["Gómez Coba, María José", "Pantoja Díaz, Luis Raúl"] },
      { id: "t20-4", time: "10:30", title: "Complejidad social y formalización del patrón de plaza 2 en un grupo residencial de Polok Kéej", authors: ["Bolio Zapata, Catalina Esther", "Gómez Coba, María José", "Pantoja Díaz, Luis Raúl"] },
      { id: "t20-5", time: "11:00", title: "La columnata del yugo (estructura 5c2) del grupo de la serie inicial en Chichén Itzá: un análisis de sus contextos", authors: ["Euan Canul, Gabriel Ángel"] },
    ]
  },
  {
    day: "mar30", id: "s21", title: "Mesa: Sitios y materiales del Proyecto Tren Maya",
    type: "sesion", room: "Aula 6", time: "12:00–13:30",
    talks: [
      { id: "t21-1", time: "12:00", title: "El pasado prehispánico de Escárcega, Campeche: reconocimiento arqueológico. Tren Maya, Tramo 7", authors: ["Cañas Ortiz, Alejandro"] },
      { id: "t21-2", time: "12:30", title: "El sitio de Poxilá, patrón de asentamiento, arquitectura y la convergencia regional de las tradiciones alfareras", authors: ["Ceballos Gallareta, Teresa Noemí de Jesús", "Núñez Ocampo, Rubén", "Echeverría Castillo, Susana"] },
      { id: "t21-3", time: "13:00", title: "Ornamentos prehispánicos de concha en forma de anuros", authors: ["Hernández González, Cristian Alonso", "Arce Acosta, Marisol", "Acevedo Chin, María Elodia"] },
    ]
  },
  {
    day: "mar30", id: "s22", title: "Simposio: Oficios, roles e instituciones: dinámicas socioculturales en el Clásico maya",
    type: "sesion", room: "Aula 7", time: "9:00–13:30",
    talks: [
      { id: "t22-1", time: "9:00", title: "El matrimonio como estrategia política para la disputa del territorio: la línea defensiva de Piedras Negras frente a Yaxchilán", authors: ["Martínez Gutiérrez, Natalia"] },
      { id: "t22-2", time: "9:30", title: "Mujeres y ritualidad en la sociedad maya: entre lo público y lo doméstico", authors: ["Horcajada Campos, Patricia"] },
      { id: "t22-3", time: "10:00", title: "Manos mayas de Belice: identidad artesanal en la cerámica estilo Petkanché", authors: ["Ruiz Pérez, Diego", "San José Ortigosa, Elena"] },
      { id: "t22-4", time: "10:30", title: "La cacería y el cazador en el Clásico maya", authors: ["Rivera Acosta, Laura Gabriela"] },
      { id: "t22-5", time: "11:00", title: "La pelota y la cuerda: metáforas de cosificación y animalización de los cautivos de guerra en el Clásico maya", authors: ["San José Ortigosa, Elena"] },
      { id: "t22-6", time: "12:00", title: "La casa de K'uk' Bahlam: reconstruyendo la estructura de un linaje noble no real del Petén en el Clásico Temprano", authors: ["Beliaev, Dmitri"] },
      { id: "t22-7", time: "12:30", title: "Formación del sistema de gobierno local en la región del alto Usumacinta y sus cambios en el período Clásico Tardío", authors: ["Safronov, Alexander"] },
      { id: "t22-8", time: "13:00", title: "Entre palacio y periferia: Grupo IV de Palenque y la institucionalización de la élite no real", authors: ["Sekacheva, Daria"] },
    ]
  },
  {
    day: "mar30", id: "s23", title: "Mesa: Configuración, función y percepción de los espacios públicos y monumentales",
    type: "sesion", room: "Aula 8", time: "9:00–12:30",
    talks: [
      { id: "t23-1", time: "9:00", title: "Resultados de las investigaciones arqueológicas en el grupo principal de Copán, Honduras, durante el primer cuarto de siglo XXI", authors: ["Nakamura, Seiichi"] },
      { id: "t23-2", time: "9:30", title: "Arquitectura, espacio público y transformaciones sociopolíticas: perspectivas del Grupo Central E en Yaxnohcah, Campeche", authors: ["Lockett-Harris, Joshuah", "Reese-Taylor, Kathryn", "Kupprat, Felix", "Anaya Hernández, Armando"] },
      { id: "t23-3", time: "10:00", title: "Es hora del partido: estacionalidad, equinoccios, pasos cenitales y el ciclo agrícola en el juego de pelota maya clásico", authors: ["Savchenko, Ivan"] },
      { id: "t23-4", time: "10:30", title: "El suburbio al otro lado del río. Discusión sobre los sistemas de asentamiento en Potonchán y Jonuta, Tabasco", authors: ["Guevara Chumacero, Miguel"] },
      { id: "t23-5", time: "11:00", title: "Arquitectura y poder político: el motivo \"pop\" en la parte central de la península de Yucatán", authors: ["Paap, Iken", "Benavides Castillo, Antonio", "Wagner, Elisabeth"] },
      { id: "t23-6", time: "12:00", title: "Caracterización acústica y auralización del sitio arqueológico de Edzná", authors: ["Navas Reascos, Gustavo Sebastián"] },
    ]
  },
  {
    day: "mar30", id: "s24", title: "Mesa: Dinámicas socioambientales de los pueblos mayas",
    type: "sesion", room: "Aula 9", time: "9:30–11:00",
    talks: [
      { id: "t24-1", time: "9:30", title: "El solar maya como reserva de conocimiento tradicional y su impacto en el medio ambiente", authors: ["Carrera Kurjenoja, Janina Cassandra"] },
      { id: "t24-2", time: "10:00", title: "El reconocimiento de la FAO a la Milpa Maya: caminos de organización y resistencia", authors: ["Rosales González, Margarita"] },
      { id: "t24-3", time: "10:30", title: "Saberes bioculturales: diagnóstico de conocimientos tradicionales en las infancias mayas de Xcunyá, Yucatán", authors: ["Paredes Chi, Arely Anahy", "Rodríguez Martínez, Yassir Jesús", "Macías Camacho, Alexia Michelle"] },
    ]
  },
  {
    day: "mar30", id: "s25", title: "Mesa: Antropología física",
    type: "sesion", room: "Aula 9", time: "12:00–14:00",
    talks: [
      { id: "t25-1", time: "12:00", title: "El aliento vital. Un caso de esgrafiado dental en Uxul, Campeche", authors: ["Ruiz Cazares, José Ricardo", "Seefeld, Nicolaus", "Manrique Ortega, Mayra Dafne", "Casanova Sarmiento, Juan Alejandro"] },
      { id: "t25-2", time: "12:30", title: "Ofrenda de sujetos infantiles representados a través de sus piezas dentales en Tixcacal, Yucatán, pertenecientes al Clásico Tardío", authors: ["Gallardo Velázquez, Alfonso", "Del Castillo Chávez, Oana", "Pimienta Merlín, Martha"] },
      { id: "t25-3", time: "13:00", title: "Comensalidad, ritualidad y memoria en la región de Oxkintok, Yucatán: una aproximación desde la arqueometría", authors: ["Fernández Souza, Lilia", "Muñoz Rodríguez, David", "Uc González, Eunice", "Novelo Pérez, María Jesús"] },
      { id: "t25-4", time: "13:30", title: "Navegar entre las cenizas del tiempo: análisis biológico forense del suplicio de Jacinto Canek", authors: ["Rodríguez, Lizbeth de las Mercedes"] },
    ]
  },
  {
    day: "mar30", id: "s-plen2", title: "Mesa plenaria II: Calakmul y el sur de Campeche. ¿Qué sabemos y qué nos falta entender?",
    type: "plenaria", room: "Auditorio Benemérito Instituto Campechano", time: "17:00–19:00",
    talks: [
      { id: "tp2-1", time: "17:00", title: "Reflexiones sobre el paisaje urbano del sur de Campeche. Avances y retos", authors: ["Velázquez Morlet, Adriana"] },
      { id: "tp2-2", time: "", title: "Calakmul y la región del Bajo El Laberinto: gobernanza, asentamiento y economía del Preclásico al Posclásico", authors: ["Reese-Taylor, Kathryn"] },
      { id: "tp2-3", time: "", title: "Río Bec, Campeche: una mirada sobre las relaciones entre centros y periferias", authors: ["Lemonnier, Eva"] },
      { id: "tp2-4", time: "", title: "Conjuntos anidados en las tierras bajas mayas: ¿mercados?", authors: ["Šprajc, Ivan"] },
    ]
  },
  // === MIÉRCOLES 1 ===
  {
    day: "mie01", id: "s26", title: "Simposio: El Mirador, Petén, Guatemala: perspectivas de tiempo y espacio",
    type: "sesion", room: "Aula 1", time: "9:00–14:00",
    talks: [
      { id: "t26-1", time: "9:00", title: "Algunos aspectos de la producción cerámica en el sitio arqueológico El Mirador y sus zonas de influencia a través del tiempo", authors: ["Martínez Hidalgo, Gustavo"] },
      { id: "t26-2", time: "9:30", title: "Investigaciones recientes en la estructura 5A7-1 grupo Sereque, complejo La Danta, sitio arqueológico El Mirador", authors: ["Chacón de Hernández, Marcia"] },
      { id: "t26-3", time: "10:00", title: "Los Navegantes del tiempo en el edificio 316 en la Gran Acrópolis Central de El Mirador", authors: ["González Sánchez, Lorena Jeannette", "Hansen, Richard Duane"] },
      { id: "t26-4", time: "10:30", title: "Exploraciones, reconocimiento y mapeo en La Muerta. Un asentamiento periférico ubicado al sur de El Mirador", authors: ["Mauricio Martínez, Douglas Yerovy", "Morales Aguilar, Carlos"] },
      { id: "t26-5", time: "11:00", title: "Arquitectura Clásica del sitio La Muerta en la Cuenca Mirador, Petén: sobreviviendo el colapso preclásico", authors: ["Balcárcel Villagrán, Ana Beatriz", "Hansen, Richard Duane"] },
      { id: "t26-6", time: "12:00", title: "Navegando del Clásico Temprano al Tardío con algunos de sus materiales especiales del grupo Laberinto de La Muerta", authors: ["Flores Mendía, Sheila Magaly", "Balcárcel Villagrán, Ana Beatriz"] },
      { id: "t26-7", time: "12:30", title: "Investigaciones en los monumentos 1 y 2, La Muerta, El Mirador", authors: ["Suyuc Ley, Edgar", "Hansen, Richard Duane"] },
      { id: "t26-8", time: "13:00", title: "La conservación como herramienta interpretativa y persistencia ritual en los edificios A1, A2 y el Monumento 1 de La Muerta", authors: ["Guzmán Urbina, Josué Leonardo"] },
      { id: "t26-9", time: "13:30", title: "El Programa de Mapeo de El Mirador, Petén, Guatemala: metodologías, resultados y aportes de tres décadas de investigación cartográfica (2003-2023)", authors: ["Hansen, Richard Duane", "Morales Aguilar, Carlos", "Mauricio Martínez, Douglas Yerovy", "Suyuc Ley, Edgar"] },
    ]
  },
  {
    day: "mie01", id: "s27", title: "Simposio: Estudios recientes en la arqueología de Yucatán",
    type: "sesion", room: "Aula 2", time: "9:00–14:00",
    talks: [
      { id: "t27-1", time: "9:00", title: "Salvamentos arqueológicos en los alrededores de Yalcobá y la posible relación de estos sitios con el reino de Talol", authors: ["Castillo Borges, Víctor Rogerio", "Vargas de la Peña, Leticia"] },
      { id: "t27-2", time: "9:30", title: "Aportaciones a los estudios arqueológicos de la región noroccidental de la península de Yucatán", authors: ["Uc González, Eunice"] },
      { id: "t27-3", time: "10:00", title: "Evidencias de arquitectura megalítica en estructuras domésticas mayas del nororiente de Yucatán", authors: ["Quintal Suaste, Alicia Beatriz", "Hernández González, Cristian Alonso", "Estrada Faisal, José Manuel"] },
      { id: "t27-4", time: "10:30", title: "Conociendo la historia del área que habitaron los gobiernos de Ichkaantijoo (Dzibilchaltun, Yucatán)", authors: ["Góngora Salas, Ángel Gerardo", "Ancona Aragón, Iliana Isabel"] },
      { id: "t27-5", time: "11:00", title: "Una primera mirada a las prácticas funerarias en el sitio de Xiol, Kanasín, Yucatán", authors: ["Peraza Lope, Carlos", "Cruz-Alvarado, Wilberth", "Serafin, Stanley"] },
      { id: "t27-6", time: "12:00", title: "Panabá en la arqueología maya: avances y perspectivas", authors: ["Barrera Rubio, Alfredo", "Morales Uh, Raúl", "Cool Argüelles, Gustavo Alejandro"] },
      { id: "t27-7", time: "12:30", title: "Nuevos hallazgos arqueológicos y desafíos para la conservación del patrimonio arqueológico en el norte de Yucatán: el caso del sitio San Pedro", authors: ["Burgos Villanueva, Rafael", "Palomo Carrillo, Yoly", "Ayala Garza, Daniel"] },
      { id: "t27-8", time: "13:00", title: "El Cono Sur, estado de Yucatán: los sitios chenes del Clásico Tardío", authors: ["Sierra Sosa, Thelma", "Ceballos Gallareta, Teresa Noemí de Jesús"] },
      { id: "t27-9", time: "13:30", title: "Políticas de guerra y corazones encendidos: análisis del discurso arquitectónico e iconográfico de la Casa de los Escudos, Chichén Itzá", authors: ["Sobrino Fernández, Santiago Alberto", "Osorio León, José Francisco Javier", "Pérez Ruiz, Francisco", "Cortés Gutiérrez, José Arturo"] },
    ]
  },
  {
    day: "mie01", id: "s28", title: "Mesa: Exploraciones y movilidades, siglo XIX, I",
    type: "sesion", room: "Aula 3", time: "9:00–12:30",
    talks: [
      { id: "t28-1", time: "9:00", title: "Las condiciones laborales de los jornaleros de haciendas yucatecas en los años 1880-1910", authors: ["Klimov, Nickolay"] },
      { id: "t28-2", time: "9:30", title: "\"Un nuevo cargamento de 192 indios han sido conducidos a La Habana\": estigma y reconstrucción identitaria de los mayas yucatecos en Cuba", authors: ["Craveri, Michela Elisa"] },
      { id: "t28-3", time: "10:00", title: "El pueblo maya y la fiscalidad campechana durante el siglo XIX", authors: ["Soria Soria, Fernando"] },
      { id: "t28-4", time: "10:30", title: "La noche de los mayas de la gran pantalla a la sala de conciertos. Silvestre Revueltas y el indigenismo musical", authors: ["Bajini, Irina"] },
      { id: "t28-5", time: "11:00", title: "Reseña de Heaven: una colección del siglo XIX de \"Antigüedades mexicanas\" en el Museo Británico", authors: ["Zehrt, Claudia"] },
      { id: "t28-6", time: "12:00", title: "Conectar el presente con el pasado. La actuación de la Orden de Santo Domingo en Chiapas, a fines del siglo XX", authors: ["Mora Reyes, María Fernanda"] },
    ]
  },
  {
    day: "mie01", id: "s29", title: "Mesa: Cosmovisiones y ritualidad",
    type: "sesion", room: "Aula 3", time: "12:30–14:30",
    talks: [
      { id: "t29-1", time: "12:30", title: "K'uhul Chij, el pasado y el presente del venado en la cosmovisión maya", authors: ["Osante García, Rodolfo Román Salvador"] },
      { id: "t29-2", time: "13:00", title: "Entre consortes y mazorcas: un análisis a la relación entre sexualidad y alimentación en el pensamiento maya yucateco", authors: ["Sobarzo Magallanes, Angélica"] },
      { id: "t29-3", time: "13:30", title: "Cruzar los tiempos, reorientar los caminos. Perspectivas sobre una decada de evolución y adaptación en las prácticas rituales de San Pedro Chanal, Chiapas", authors: ["Montes Lara, Laura Audrey"] },
      { id: "t29-4", time: "14:00", title: "De plagas y plegarias. La fiesta a San Sebastián Mártir de una comunidad en Chiapas", authors: ["Anguiano Torres, Miguel Ángel de Jesús"] },
    ]
  },
  {
    day: "mie01", id: "s30", title: "Mesa: Arqueología de Chiapas: nuevos estudios",
    type: "sesion", room: "Aula 4", time: "9:00–12:30",
    talks: [
      { id: "t30-1", time: "9:00", title: "Patrón Preclásico Medio/Tardío y Patrón Clásico Tardío/Terminal: dos patrones de asentamiento en la Costa Pacífica de Chiapas y Guatemala", authors: ["Arredondo Leiva, Ernesto"] },
      { id: "t30-2", time: "9:30", title: "Retos y nuevas oportunidades en el estudio de la cronología cerámica de Palenque, Chiapas", authors: ["Mirón Marván, Esteban"] },
      { id: "t30-3", time: "10:00", title: "Un enigma antropomorfo de musivaria en piedra verde", authors: ["Martínez del Campo Lanz, Sofía"] },
      { id: "t30-4", time: "10:30", title: "Perspectivas microbotánicas sobre el procesamiento doméstico de plantas en Palenque durante el período Clásico", authors: ["Newhall, Victoria"] },
      { id: "t30-5", time: "11:00", title: "Resultados preliminares de la investigación arqueológica en Sol y Paraíso, en la Selva Lacandona, Chiapas", authors: ["Shiratori, Yuko"] },
      { id: "t30-6", time: "12:00", title: "Muk'ul Akil en 3D: intervención interdisciplinaria y mapeo LIDAR para reconstruir la organización espacial prehispánica", authors: ["Molina Hernández, Omar Leopoldo", "López Jiménez, Fanny"] },
    ]
  },
  {
    day: "mie01", id: "s31", title: "Simposio: Unidades domésticas en la región de Calakmul, Campeche",
    type: "sesion", room: "Aula 5", time: "9:00–13:00",
    talks: [
      { id: "t31-1", time: "9:00", title: "Cerámica doméstica de Calakmul, Campeche, México", authors: ["Walker, Debra S."] },
      { id: "t31-2", time: "9:30", title: "Patrones de densificación poblacional en la región de Calakmul, Campeche", authors: ["Kobylt, Jordan", "Canuto, Marcello A.", "Reese-Taylor, Kathryn", "Kupprat, Felix"] },
      { id: "t31-3", time: "10:00", title: "La cerámica doméstica como indicador de desigualdad en Calakmul durante el Clásico Temprano", authors: ["Gutiérrez Rodríguez, Sofía"] },
      { id: "t31-4", time: "10:30", title: "Investigaciones arqueológicas en Ximbal Che: élites intermedias, intercambio de mercado y dinámica socioeconómica regional", authors: ["Longstaffe, Matthew", "Anaya Hernández, Armando", "Walker, Debra S.", "Reese-Taylor, Kathryn"] },
      { id: "t31-5", time: "11:00", title: "Análisis geoarqueológico de perfiles edafo-sedimentarios en un área residencial del Grupo Xaman de Calakmul", authors: ["Chávez Herrerías, Alejandra"] },
      { id: "t31-6", time: "12:00", title: "Viento en lugares bajos: investigaciones recientes en el Grupo Canché, Calakmul, México", authors: ["Montgomery, Shane", "Anaya Hernández, Armando", "Reese-Taylor, Kathryn", "Walker, Debra S."] },
      { id: "t31-7", time: "12:30", title: "Actividades de producción en el conjunto Xtabay de Calakmul, Campeche, durante el Clásico Tardío y Terminal", authors: ["Mercado Álvarez, Mario Alfredo"] },
    ]
  },
  {
    day: "mie01", id: "s32", title: "Simposio: Formas del patrimonio biocultural maya-yucateco: Navegando el tiempo presente",
    type: "sesion", room: "Aula 6", time: "9:00–14:00",
    talks: [
      { id: "t32-1", time: "9:00", title: "Resiliencia y defensa territorial del pueblo maya yucateco frente a la patrimonialización biocultural", authors: ["Duarte Duarte, Ana Rosa"] },
      { id: "t32-2", time: "9:30", title: "Contradicción entre utopías reales y las narrativas del capitalismo global en el turismo de economía social de la península de Yucatán", authors: ["Joault, Samuel"] },
      { id: "t32-3", time: "10:00", title: "Cuevas y cenotes en Yucatán: del ambiente natural y sagrado a la degradación cultural y ecológica", authors: ["Victoria Ojeda, Jorge"] },
      { id: "t32-4", time: "10:30", title: "Turismo indígena, patrimonio biocultural y utilización de tecnologías digitales en la península de Yucatán", authors: ["López Peña, Rodrigo Javier"] },
      { id: "t32-5", time: "11:00", title: "Patrimonio, identidad e historia. Los desfases de una comunidad", authors: ["Pool Cab, Marcos Noé"] },
      { id: "t32-6", time: "12:00", title: "Árboles ancestrales del solar en el pensamiento filosófico maya", authors: ["Martínez Isidro, Paulina", "Sánchez Suárez, Aurelio"] },
      { id: "t32-7", time: "12:30", title: "Biodiversidad técnica maya y resistencia: economía local y oralidad frente al régimen escritural", authors: ["Laforestie, Melanie"] },
      { id: "t32-8", time: "13:00", title: "Entre la autonomía situada y la captura epistémica: tensiones y rutas para la vitalidad del patrimonio biocultural maya en el bachillerato de la NEM", authors: ["Reyes Mendoza, Nayely Melina"] },
      { id: "t32-9", time: "13:30", title: "El teatro en idioma maya y la revitalización del patrimonio lingüístico y cultural", authors: ["Sosa Castillo, Silvia Georgina", "Mijangos Noh, Juan Carlos"] },
    ]
  },
  {
    day: "mie01", id: "s33", title: "Simposio: La flora medicinal maya peninsular, conservación y salvaguarda",
    type: "sesion", room: "Aula 7", time: "9:00–11:30",
    talks: [
      { id: "t33-1", time: "9:00", title: "Conservación y salvaguarda de la flora medicinal a través de los vínculos socioterritoriales en tres comunidades mayas peninsulares", authors: ["Huicochea Gómez, Laura", "Cahuich Campos, Diana"] },
      { id: "t33-2", time: "9:30", title: "Flora medicinal en la comunidad maya de Yaxunah: conservación y salvaguarda", authors: ["Murguía Argüelles, Rocío Carolina"] },
      { id: "t33-3", time: "10:00", title: "Cuidados del cuerpo y vínculos territoriales en Chancah Veracruz, Quintana Roo", authors: ["Serralta Peraza, Lidia Esther del Socorro", "Torrescano Valle, Nuria"] },
      { id: "t33-4", time: "10:30", title: "Desafíos para la salvaguarda y conservación de la flora medicinal en Ich Ek, Campeche", authors: ["Solís Hernández, Valeria"] },
      { id: "t33-5", time: "11:00", title: "Estrategia de difusión de los valores socioterritoriales de la flora medicinal", authors: ["Uitz May, Miriam", "Tah Dzib, Secundino"] },
    ]
  },
  {
    day: "mie01", id: "s34", title: "Mesa: Textos en piedra y cerámica: nuevas perspectivas desde los estudios epigráficos",
    type: "sesion", room: "Aula 7", time: "12:00–14:30",
    talks: [
      { id: "t34-1", time: "12:00", title: "El Clásico Terminal en el norte del Petén y el sur de Campeche", authors: ["Grube, Nikolai"] },
      { id: "t34-2", time: "12:30", title: "Las inscripciones del reino de Hix Witz, Petén, Guatemala: resultados del Proyecto Epigráfico Hix Witz 2025", authors: ["Botzet, Marie"] },
      { id: "t34-3", time: "13:00", title: "La evolución política de Quiriguá en la época de K'ahk' Tiliw Chan Yopaat", authors: ["Shcheglova, Ksenia"] },
      { id: "t34-4", time: "13:30", title: "Los signos de figura completa en la escritura maya del Clásico: estudio semiótico-gramatológico", authors: ["Moreno Magariño, Mauricio"] },
      { id: "t34-5", time: "14:00", title: "Un sabor desconocido con una pizca de gramática: el análisis epigráfico-lingüístico de unos vasos mayas del Clásico", authors: ["Baboshkin, Maxim"] },
    ]
  },
  {
    day: "mie01", id: "s35", title: "Simposio: Una perspectiva arqueológica de la costa marina de las tierras bajas mayas del norte",
    type: "sesion", room: "Aula 8", time: "9:00–12:30",
    talks: [
      { id: "t35-1", time: "9:00", title: "Comercio costero y cultos compartidos entre los pueblos prehispánicos del Golfo de México", authors: ["Gallegos Gómora, Miriam Judith"] },
      { id: "t35-2", time: "9:30", title: "Interpretando la economía maya pre-Hispánica: la dificilísima tarea de reconstruir el intercambio económico", authors: ["Cobos, Rafael"] },
      { id: "t35-3", time: "10:00", title: "La vida cotidiana y la subsistencia en la Isla Cancún, Quintana Roo", authors: ["Elizalde Rodarte, Sandra Verónica"] },
      { id: "t35-4", time: "10:30", title: "Estilos cerámicos de la pasta fina del Golfo de México: la península de Yucatán", authors: ["Jiménez Álvarez, Socorro", "Sierra Sosa, Thelma"] },
      { id: "t35-5", time: "11:00", title: "Movilidad entre los mayas prehispánicos en la costa de la península de Yucatán", authors: ["Cucina, Andrea", "Ortega Muñoz, Allan"] },
      { id: "t35-6", time: "12:00", title: "Entre el mar y el inframundo: arqueología subterránea maya en Cancún y Puerto Morelos", authors: ["De Anda Alanís, Guillermo"] },
    ]
  },
  {
    day: "mie01", id: "s36", title: "Mesa: Iconografía y política",
    type: "sesion", room: "Aula 9", time: "9:00–11:00",
    talks: [
      { id: "t36-1", time: "9:00", title: "Cuatripartición, acción ritual y despliegue del poder en Copán", authors: ["Somohano Eres, Ana"] },
      { id: "t36-2", time: "9:30", title: "Elementos de figuración que establecen relaciones entre las iconografías religiosas de las sociedades del Centro de Veracruz y mayas del Clásico tardío", authors: ["Huckert, Chantal"] },
      { id: "t36-3", time: "10:00", title: "La deidad de la tierra en Chwitinamit, Guatemala: una relectura de sus monumentos trapezoidales", authors: ["Garay Herrera, Alejandro José", "Botzet, Marie"] },
      { id: "t36-4", time: "10:30", title: "Kiix: la espina de mantarraya", authors: ["García Martínez, Guadalupe Jatziri"] },
    ]
  },
  {
    day: "mie01", id: "s37", title: "Mesa: Arqueología en Guatemala, del Petén a la Costa Sur",
    type: "sesion", room: "Aula 9", time: "12:00–15:00",
    talks: [
      { id: "t37-1", time: "12:00", title: "El Tigre (Petén, Guatemala): la trayectoria de una comunidad preclásica a la sombra de los gigantes", authors: ["Hiquet, Julien", "Patiño Contreras, Alejandro"] },
      { id: "t37-2", time: "12:30", title: "El Grupo del Petrograbado, un espacio sagrado dentro de Tayasal, Petén, Guatemala", authors: ["Chocón Tun, Jorge Enrique"] },
      { id: "t37-3", time: "13:00", title: "Los \"incensarios\" de estilo teotihuacano de Escuintla, Guatemala", authors: ["Barrientos Quezada, Tomás José", "Sánchez Pérez, Mariana", "Celada González, José Andrés"] },
      { id: "t37-4", time: "13:30", title: "La colección maya proveniente del sitio arqueológico Chich'en, Alta Verapaz, Guatemala", authors: ["Montoya, Julia"] },
      { id: "t37-5", time: "14:00", title: "Nuevos rasgos lineales en el Bajo Azúcar, Guatemala: implicaciones para el estudio del impacto antropogénico", authors: ["Morales Aguilar, Carlos"] },
      { id: "t37-6", time: "14:30", title: "Hegemonía sobre el terreno: integración política y estructura de asentamiento en La Corona (Sak Nikte')", authors: ["Canuto, Marcello A.", "Barrientos Quezada, Tomás José"] },
    ]
  },
  {
    day: "mie01", id: "s-plen3", title: "Mesa plenaria III: Poder y dinámicas de exclusión: discursos, miradas y equívocos",
    type: "plenaria", room: "Auditorio Benemérito Instituto Campechano", time: "17:00–19:00",
    talks: [
      { id: "tp3-1", time: "17:00", title: "El Retorno de la reina: Ix Ch'ak Ch'een y la roca de la fundación de Cobá", authors: ["Esparza Olguín, Octavio Quetzalcóatl", "Stuart, David"] },
      { id: "tp3-2", time: "", title: "Oxpemul, Campeche: una revaluación de su configuración dinástica", authors: ["Mumary Farto, Pablo Alberto"] },
      { id: "tp3-3", time: "", title: "Viajeros, redes y circulaciones internacionales en el siglo XIX", authors: ["Sarazúa Pérez, Juan Carlos"] },
      { id: "tp3-4", time: "", title: "Aproximación cosmopolítica a las tensiones, negociaciones y traducciones entre la ciencia médica y la perspectiva chol de la enfermedad", authors: ["Rodríguez Ceja, Gabriela"] },
    ]
  },
  // === JUEVES 2 ===
  {
    day: "jue02", id: "s38", title: "Simposio: Avances de las investigaciones en Palenque y Toniná, Chiapas",
    type: "sesion", room: "Aula 1", time: "9:00–14:00",
    talks: [
      { id: "t38-1", time: "9:00", title: "Una revisión del Clásico Temprano en Toniná: el caso del \"Gobernante 1\" (ca. 500-526)", authors: ["Sánchez Gamboa, Ángel Adrián"] },
      { id: "t38-2", time: "9:30", title: "Documentación 3D de inscripciones jeroglíficas e iconografía en el sitio maya de Toniná (Chiapas)", authors: ["Prager, Christian", "Grothe, Antje", "Wagner, Elisabeth", "Krempel, Guido"] },
      { id: "t38-3", time: "10:00", title: "La agencia femenina en la corte de Po'", authors: ["Parpal Cabanes, Esther"] },
      { id: "t38-4", time: "10:30", title: "Corcovados y sacrificados: evidencias óseas en el Osario 15 de Toniná y en representaciones plásticas mayas", authors: ["Ruiz González, Judith L."] },
      { id: "t38-5", time: "11:00", title: "El color como indicador tecnológico: análisis comparativo de las colecciones arqueológicas de Palenque y Toniná", authors: ["Ejarque Gallardo, Ángela"] },
      { id: "t38-6", time: "12:00", title: "La historia antigua de Palenque a partir de la evidencia paleontológica y cultural, una perspectiva interdisciplinaria", authors: ["Rubio Aranda, Olivia"] },
      { id: "t38-7", time: "12:30", title: "Mutilación, reescritura y apropiación: la política de la imagen y la copia de formatos escultóricos de los vencidos en la cultura maya. El caso de Palenque", authors: ["Polyukhovych, Yuriy"] },
      { id: "t38-8", time: "13:00", title: "Las rocas empleadas en la elaboración de hachas y yugos en Palenque: evidencias de nuevas rutas de intercambio", authors: ["Cuevas García, Martha"] },
      { id: "t38-9", time: "13:30", title: "Estudio no invasivo in situ de ofrendas de piedra verde de Palenque", authors: ["Ruvalcaba Sil, José Luis", "Casanova González, Edgar", "Manrique Ortega, Mayra Dafne"] },
    ]
  },
  {
    day: "jue02", id: "s39", title: "Simposio: Los códices: tejedores del tiempo",
    type: "sesion", room: "Aula 2", time: "9:00–12:30",
    talks: [
      { id: "t39-1", time: "9:00", title: "Hilar y tejer en el Códice Madrid", authors: ["Morales Damián, Manuel Alberto"] },
      { id: "t39-2", time: "9:30", title: "Tiempos fragantes, tiempos hediondos según los almanaques de los códices mayas", authors: ["Peralta Cervantes, Diana Yolanda"] },
      { id: "t39-3", time: "10:00", title: "Hacia un concepto de sacrificio humano desde la narrativa visual de los códices mayas", authors: ["Domínguez Ángeles, Alondra"] },
      { id: "t39-4", time: "10:30", title: "La canoa maya: análisis del Códice Dresde", authors: ["Ramos, Jazmín Angélica"] },
      { id: "t39-5", time: "11:00", title: "Q'uq'-Raxon: sobre las aves y los augurios de riqueza en los códices y la tradición oral de los mayas", authors: ["Estrada Peña, Canek"] },
      { id: "t39-6", time: "12:00", title: "Augurios como \"brocados\". Una hipótesis sobre los almanaques de los códices mayas", authors: ["Sotelo Santos, Laura Elena"] },
    ]
  },
  {
    day: "jue02", id: "s40", title: "Mesa: Los calendarios entre los grupos mayas prehispánicos y contemporáneos",
    type: "sesion", room: "Aula 3", time: "9:00–11:30",
    talks: [
      { id: "t40-1", time: "9:00", title: "The Long Count correlation problem in the light of the Classic Maya lunar calendar", authors: ["Naumenko, Jan", "Vepretskii, Sergei"] },
      { id: "t40-2", time: "9:30", title: "Los conflictos bélicos entre los mayas clásicos. Un acercamiento desde la cuenta de 260 días", authors: ["Mex Albornoz, William Humberto"] },
      { id: "t40-3", time: "10:00", title: "El Códice de París como almanaque del tiempo", authors: ["Gómez Miranda, J. Antonio"] },
      { id: "t40-4", time: "10:30", title: "Reconstructing the Calendar Logic of Pages 22-24 in the Paris Codex", authors: ["Špoták, Jakub"] },
      { id: "t40-5", time: "11:00", title: "¿Qué podemos saber acerca del calendario proto-q'anjob'al? Inferencias a partir del estudio comparativo de los calendarios de los mayas de la Sierra de los Cuchumatanes", authors: ["Garay Herrera, Alejandro José"] },
    ]
  },
  {
    day: "jue02", id: "s41", title: "Mesa: Exploraciones y movilidades, siglo XIX, II",
    type: "sesion", room: "Aula 3", time: "12:00–14:30",
    talks: [
      { id: "t41-1", time: "12:00", title: "Escritura, lengua e historia: aproximación metodológica al análisis de la correspondencia en lengua maya del siglo XIX", authors: ["Ek Ek, Lendy Rosario"] },
      { id: "t41-2", time: "12:30", title: "El secuestro de la goleta campechana \"Brillante\" en aguas territoriales mexicanas del Golfo de México", authors: ["González Oropeza, Manuel"] },
      { id: "t41-3", time: "13:00", title: "Rutas de hierro, vidas en tránsito: actores y génesis del sistema ferroviario en Campeche", authors: ["Cahuich Campos, Martha Beatriz"] },
      { id: "t41-4", time: "13:30", title: "Un estudio histórico y numismático de las haciendas de Campeche (1861-1916)", authors: ["Ruiz Velasco Bengoa, Mauricio"] },
      { id: "t41-5", time: "14:00", title: "Pensar lo maya desde lo local: Bachajón y la comprensión de sus procesos históricos en la historia regional y nacional", authors: ["Silvano Jiménez, Miguel"] },
    ]
  },
  {
    day: "jue02", id: "s42", title: "Simposio: Primeros viajeros y exploradores del área maya",
    type: "sesion", room: "Aula 4", time: "9:00–13:30",
    talks: [
      { id: "t42-1", time: "9:00", title: "Desde los primeros bocetos hasta sus últimas litografías. Evolución gráfica, difusionismo y mitificación en las obras de Jean-Frédéric Waldeck entre 1832 y 1875", authors: ["Begel, Johann"] },
      { id: "t42-2", time: "9:30", title: "La fiebre del oro: la medalla de oro de la Société de Géographie de Paris de 1826 y la exploración temprana de Palenque", authors: ["Mathews, Peter"] },
      { id: "t42-3", time: "10:00", title: "La primera bodega de Palenque: la colección de artefactos misceláneos de Waldeck", authors: ["Callaway, Carl"] },
      { id: "t42-4", time: "10:30", title: "Jean Frédéric Waldeck y sus andanzas en Campeche y Mérida", authors: ["Martínez Gastélum, José Daniel"] },
      { id: "t42-5", time: "11:00", title: "Una casa con muchas historias. La Casa D del Palacio de Palenque a través de la mirada de los viajeros de los siglos XVIII y XIX", authors: ["Santos García, Salvador"] },
      { id: "t42-6", time: "12:00", title: "De ruinas mayas, impresos y exploraciones arqueológicas. Los viajes de John Lloyd Stephens y Frederick Catherwood en la cultura impresa y letrada del México independiente", authors: ["Bahena Aréchiga Carrillo, Mario Jocsán"] },
      { id: "t42-7", time: "12:30", title: "De \"bello espectáculo\" e \"infernal música\". Las fiestas en el área maya ante la mirada de los viajeros decimonónicos", authors: ["Anguiano Torres, Miguel Ángel de Jesús", "Arteaga González, Ashly Abigail"] },
      { id: "t42-8", time: "13:00", title: "Largas son las noches", authors: ["González, Pablo"] },
    ]
  },
  {
    day: "jue02", id: "s43", title: "Simposio: Ontologías mayas del tiempo y espacio",
    type: "sesion", room: "Aula 5", time: "9:00–11:30",
    talks: [
      { id: "t43-1", time: "9:00", title: "¿Un quincunce en el paisaje vivencial de Yaxkukul? Análisis etnográfico participativo de un documento colonial temprano", authors: ["Straffi, Enrico"] },
      { id: "t43-2", time: "9:30", title: "\"No es que las piedras sean mudas\": Un acercamiento preliminar de reflexión desde la perspectiva de la agencia de los objetos en el mundo maya", authors: ["Pimenta-Silva, Miguel", "Grecco Pacheco, Daniel"] },
      { id: "t43-3", time: "10:00", title: "The Framer and the Shaper, Maya Kinship, jaloj-k'exoj, and Archaeological Arguments on Past Ontologies", authors: ["Gilewski, Michal"] },
      { id: "t43-4", time: "10:30", title: "Seres-piedra, materialidad y ontologías en la Gran Plaza de Copán, Honduras", authors: ["Grecco Pacheco, Daniel"] },
      { id: "t43-5", time: "11:00", title: "Entre el tiempo indicativo (aoristo) y el cómputo temporal: ontologías del tiempo en la cultura maya prehispánica", authors: ["Iwaniszewski, Stanislaw"] },
    ]
  },
  {
    day: "jue02", id: "s44", title: "Mesa: Análisis y secuencias cerámicas",
    type: "sesion", room: "Aula 6", time: "9:00–12:30",
    talks: [
      { id: "t44-1", time: "9:00", title: "Una mirada al Petén noreste desde Uaxactún: cronología y secuencia de ocupación a través de la cerámica", authors: ["García Patzán, Dora Maritza"] },
      { id: "t44-2", time: "9:30", title: "La cerámica de La Corona, Petén, Guatemala: un análisis de su distribución espacial y temporal", authors: ["González Velásquez, Ma. Alejandra", "Canuto, Marcello A.", "Barrientos Quezada, Tomás José"] },
      { id: "t44-3", time: "10:00", title: "Análisis de pastas de figurillas de Jaina y Jonuta: un estudio comparativo", authors: ["Ruvalcaba Sil, José Luis", "Mitrani, Alejandro"] },
      { id: "t44-4", time: "10:30", title: "Algunos comentarios sobre la cerámica del Valle de Yohaltún, Champotón", authors: ["Hidalgo Gutiérrez, Joaquín Alberto"] },
      { id: "t44-5", time: "11:00", title: "Relevancia regional de las cerámicas excepcionales del Clásico Tardío-Terminal en la zona Transversal", authors: ["Sears, Erin L.", "Fierro Padilla, Rafael", "Montoya, Julia"] },
      { id: "t44-6", time: "12:00", title: "Metates y manos de basalto de Jaina, Campeche. De la vida cotidiana a la ofrenda", authors: ["Poot Franco, Paulina Ivette", "Benavides Castillo, Antonio"] },
    ]
  },
  {
    day: "jue02", id: "s45", title: "Simposio: Recetarios populares de medicina maya de los siglos XVII al XIX: Los Libros del Judío",
    type: "sesion", room: "Aula 7", time: "9:00–11:00",
    talks: [
      { id: "t45-1", time: "9:00", title: "La flora medicinal: pasado y presente en la medicina tradicional maya", authors: ["Torres Avilez, Wendy Marisol"] },
      { id: "t45-2", time: "9:30", title: "La riqueza biocultural maya medicinal en los Libros del Judío en maya", authors: ["Chávez Guzmán, Mónica"] },
      { id: "t45-3", time: "10:00", title: "Los uay y la personificación de la enfermedad: cosmología y persistencia histórica en el mundo maya", authors: ["Moreno Zaragoza, Daniel"] },
      { id: "t45-4", time: "10:30", title: "Entre hierbas y pastillas: diagnóstico y atención de enfermedades en las familias tsotsiles de Venustiano Carranza, Chiapas (1960-2022)", authors: ["Jiménez Vázquez, Brenda Guadalupe"] },
    ]
  },
  {
    day: "jue02", id: "s46", title: "Mesa: Del Pleistoceno al Preclásico en la Península",
    type: "sesion", room: "Aula 7", time: "12:00–13:30",
    talks: [
      { id: "t46-1", time: "12:00", title: "Patrimonio geoarqueológico de la Cueva de Loltún, Yucatán, México", authors: ["Arroyo Cabrales, Joaquín", "Salgado Garrido, Hugo Enrique", "Barba Meinecke, Helena", "Solís Torres, Óscar Ricardo"] },
      { id: "t46-2", time: "12:30", title: "Una aproximación multidisciplinaria a los depósitos del Cuaternario en la Cueva de Loltún, Yucatán", authors: ["Arroyo Cabrales, Joaquín", "Solís Torres, Óscar Ricardo", "Barba Meinecke, Helena", "Salgado Garrido, Hugo Enrique"] },
      { id: "t46-3", time: "13:00", title: "Habitar lo sagrado. Análisis e interpretación preliminar de un contexto preclásico en Hunxectamán, Umán", authors: ["Olán de la Cruz, Fabián Alberto", "Novelo Pérez, María Jesús", "Jiménez Vázquez, Brenda Guadalupe", "Beltrán Chay, Shirley Yariela"] },
    ]
  },
  {
    day: "jue02", id: "s47", title: "Mesa: Historia profunda: territorios, cultura material y migraciones",
    type: "sesion", room: "Aula 8", time: "9:00–13:00",
    talks: [
      { id: "t47-1", time: "9:00", title: "Los chontales navegantes del río Candelaria a través del tiempo", authors: ["Vargas Pacheco, Ernesto"] },
      { id: "t47-2", time: "9:30", title: "Manos, madera y fuego. Interacciones para la elaboración de carbón vegetal en la costa de Tabasco", authors: ["Guevara Chumacero, Miguel"] },
      { id: "t47-3", time: "10:00", title: "Los mapas como herramientas de poder en la zona cultural de Mesoamérica en el long-dureé", authors: ["Graf, Paul", "Carosi, Gaia"] },
      { id: "t47-4", time: "10:30", title: "Ciclos recurrentes de violencia a través del tiempo: el pueblo maya kaqchikel desde la invasión española hasta el conflicto armado en Guatemala", authors: ["French, Brigittine", "García Matzar, Lolmay Pedro"] },
      { id: "t47-5", time: "11:00", title: "Queremos ser mexicanos. Los procesos de migración fronteriza guatemalteca en la región Comalapa, Chiapas, durante los años de 1910-2025", authors: ["Fenner, Justus"] },
      { id: "t47-6", time: "12:00", title: "De Noj Petén a Flores, el último reducto maya", authors: ["Chajón Flores, Aníbal Dionisio"] },
      { id: "t47-7", time: "12:30", title: "Los gateadores: manifestación k'iche' de San Andrés Sajcabajá", authors: ["Molina, Deyvid Paul"] },
    ]
  },
  {
    day: "jue02", id: "s48", title: "Mesa: Arqueología del norte de la península de Yucatán",
    type: "sesion", room: "Aula 9", time: "9:00–11:30",
    talks: [
      { id: "t48-1", time: "9:00", title: "Basalto en los caches de Xanab Chak: análisis de la práctica cache, el uso de basalto y piedra verde, y la relación interregional en la Puuc", authors: ["Hernández, Héctor", "Seligson, Kenneth"] },
      { id: "t48-2", time: "9:30", title: "Estudio pirotecnológico de los hornos en las tierras bajas del norte del área maya", authors: ["Ortiz Ruiz, Soledad", "Seligson, Kenneth"] },
      { id: "t48-3", time: "10:00", title: "Análisis comparativo de los pilares con policromía de Chichén Itzá", authors: ["Casanova González, Edgar", "García Solís, Claudia A.", "Mitrani, Alejandro"] },
      { id: "t48-4", time: "10:30", title: "La esencia del fuego y el cambio tecnológico en la industria de mezclas de cal en Mayapán", authors: ["De Lucio Morales, Oscar Genaro", "Ortiz Ruiz, Soledad", "Cruz-Alvarado, Wilberth", "Peraza Lope, Carlos"] },
      { id: "t48-5", time: "11:00", title: "Soñando con el fuego: un estudio etnoarqueométrico en la comunidad alfarera de Uayma, Yucatán", authors: ["Ortiz Ruiz, Soledad", "De Lucio Morales, Oscar Genaro"] },
    ]
  },
  {
    day: "jue02", id: "s49", title: "Mesa: Animales y dioses: cosmovisión e iconografía",
    type: "sesion", room: "Aula 9", time: "12:00–14:30",
    talks: [
      { id: "t49-1", time: "12:00", title: "(De)volviendo a los ancestros: la Serpiente Visión en la iconografía maya clásica", authors: ["Castañeda Camarena, Víctor Humberto", "Vázquez Soberanes, Miztlitemoc Daniel"] },
      { id: "t49-2", time: "12:30", title: "El rostro de una entidad. Nuevas consideraciones alrededor de la Serpiente Acuática maya", authors: ["Castañeda Camarena, Víctor Humberto"] },
      { id: "t49-3", time: "13:00", title: "Quién ordenó diluvio del dios del maíz: revisando los huesos tallados del entierro 116 de Tikal", authors: ["Napolskikh, Taisiia"] },
      { id: "t49-4", time: "13:30", title: "Las nuevas casas de Chajul: interpretaciones de los murales coloniales del altiplano de Guatemala", authors: ["Banach, Monika", "Castillo, Victor"] },
      { id: "t49-5", time: "14:00", title: "La imagen de trickster en las mitologías mayas y nahuas contemporáneas: un análisis comparativo de Juan Tul y Tlahueliloc (El Diablo)", authors: ["Titova, Sofia"] },
    ]
  },
  {
    day: "jue02", id: "s-plen4", title: "Mesa plenaria IV: Homenaje al Dr. William J. Folan",
    type: "plenaria", room: "Auditorio Benemérito Instituto Campechano", time: "17:00–19:00",
    talks: [
      { id: "tp4-1", time: "17:00", title: "Entre Río Bec y Calakmul: Dinámicas de interacción en la Oxpemul tardía", authors: ["Mumary Farto, Pablo Alberto"] },
      { id: "tp4-2", time: "", title: "La Universidad Autónoma de Campeche, la Arqueología y el legado de William J. Folan", authors: ["Domínguez Carrasco, Ma. del Rosario"] },
      { id: "tp4-3", time: "", title: "De huesos y rituales mayas: homenajeando al legado del Dr. William Folan (1931-2022)", authors: ["Tiesler Blos, Vera"] },
      { id: "tp4-4", time: "", title: "Entrega del Premio William J. Folan", authors: [] },
    ]
  },
  // === VIERNES 3 ===
  {
    day: "vie03", id: "s50", title: "Simposio: Los resultados recientes del Proyecto Arqueológico El Palmar, Campeche",
    type: "sesion", room: "Aula 1", time: "9:00–14:30",
    talks: [
      { id: "t50-1", time: "9:00", title: "Proyecto Arqueológico El Palmar: una introducción", authors: ["Tsukamoto, Kenichiro"] },
      { id: "t50-2", time: "9:30", title: "Un ritual de terminación en la Estructura S21-1 del Grupo Principal de El Palmar", authors: ["Verdejo Balan, Montserrat de Jesús"] },
      { id: "t50-3", time: "10:00", title: "Accediendo al Palacio. Exploración de la Estructura S21-3 de El Palmar", authors: ["Reséndiz Núñez, Erick Arturo"] },
      { id: "t50-4", time: "10:30", title: "Trabajos recientes en la Plaza Central de El Palmar", authors: ["Camacho Márquez, Uriel"] },
      { id: "t50-5", time: "11:00", title: "El significado del juego de pelota en El Palmar", authors: ["De Gregori, Mara"] },
      { id: "t50-6", time: "12:00", title: "Una residencia a orillas de la Gran Aguada de El Palmar, Campeche", authors: ["Tran, Justin"] },
      { id: "t50-7", time: "12:30", title: "Estudio diacrónico de las prácticas rituales en El Palmar: una aproximación desde los análisis de escondites y corpus epigráfico", authors: ["Barroso Salgado, Raquel"] },
      { id: "t50-8", time: "13:00", title: "La infraestructura para producción agrícola de El Palmar, Campeche, México", authors: ["Camacho Sánchez, Mijaíl Nicolás", "Hernández Espinosa, Armando", "López Mejía, Javier", "Jiménez Delgado, Gerardo"] },
      { id: "t50-9", time: "13:30", title: "Aplicación y aportaciones del registro tridimensional mediante un escáner de alta resolución en materiales arqueológicos de El Palmar", authors: ["Hernández Ortiz, Mayerlin"] },
      { id: "t50-10", time: "14:00", title: "Nuevas luces sobre la historia y el escenario político de El Palmar durante el siglo IX d. C.", authors: ["Esparza Olguín, Octavio Quetzalcóatl", "Barroso Salgado, Raquel"] },
    ]
  },
  {
    day: "vie03", id: "s51", title: "Mesa: Estudios arqueológicos en asentamientos prehispánicos de Campeche",
    type: "sesion", room: "Aula 2", time: "9:00–13:30",
    talks: [
      { id: "t51-1", time: "9:00", title: "Más allá de los Kaanu'l: arquetipos y palimpsestos urbanos en el desarrollo de la antigua ciudad de Calakmul. Una propuesta", authors: ["Flores Esquivel, Fernando C. Atasta"] },
      { id: "t51-2", time: "9:30", title: "Redes de interacción en el paisaje de Calakmul: un análisis comparativo estacional", authors: ["Farquharson, Kyle", "Reese-Taylor, Kathryn", "Anaya Hernández, Armando", "Kupprat, Felix"] },
      { id: "t51-3", time: "10:00", title: "Aguadas públicas vs privadas, análisis espacial del acceso al agua en el asentamiento prehispánico de la región de la biosfera Calakmul", authors: ["Flores Colín, Alberto Guadalupe", "Anaya Hernández, Armando"] },
      { id: "t51-4", time: "10:30", title: "El antiguo asentamiento de Can Pech y su periferia en el entorno urbano de la actual ciudad de San Francisco de Campeche", authors: ["Ojeda Mas, Heber", "Suárez Aguilar, Vicente", "Cervera Díaz, Carlos"] },
      { id: "t51-5", time: "11:00", title: "Una torre emblema o torre exenta, en Santa Rosa Xtampak, Campeche", authors: ["García Cruz, Florentino Silverio"] },
      { id: "t51-6", time: "12:00", title: "Excavaciones arqueológicas en un grupo habitacional de la periferia de Edzná, Campeche", authors: ["Torres Marzo, Ricardo", "Novelo Osorno, Sara María de las Mercedes"] },
      { id: "t51-7", time: "12:30", title: "Rastros invisibles: análisis de suelos para reconstruir actividades cotidianas en Yaxnohcah, Campeche", authors: ["Pech Guillermo, Lucero Amayrani"] },
      { id: "t51-8", time: "13:00", title: "Tecnología de talla bifacial en el sur de Campeche: el caso del sitio Miguel Colorado II", authors: ["López Corral, Aurelio", "Oseguera Barragán, Víctor Rogelio"] },
    ]
  },
  {
    day: "vie03", id: "s52", title: "Mesa: Revisitaciones a la historia del Yucatán colonial y contemporáneo",
    type: "sesion", room: "Aula 3", time: "9:00–12:30",
    talks: [
      { id: "t52-1", time: "9:00", title: "\"Diosa de los que se ahorcaban, que decían se les aparecía\". Nuevas perspectivas sobre la deidad Ix Tab", authors: ["Vázquez Soberanes, Miztlitemoc Daniel"] },
      { id: "t52-2", time: "9:30", title: "La navegación militar en la región de la Chontalpa. Desde la época prehispánica hasta los procesos de conquista", authors: ["Jiménez Villarruel, Carlos Suriel"] },
      { id: "t52-3", time: "10:00", title: "Rehacer la historia. Un análisis historiográfico sobre el declive de Mayapán en la documentación colonial de Yucatán (siglos XVI y XVII)", authors: ["López Del Río, Jesús"] },
      { id: "t52-4", time: "10:30", title: "Experiencias corporales y sensoriales mayas en el marco del fenómeno de la piratería en Yucatán, siglos XVI y XVII", authors: ["De la O Torres, Rodrigo Alejandro"] },
      { id: "t52-5", time: "11:00", title: "Una ceiba multicolor. Consideraciones teóricas e historiográficas para la investigación de las Historias sobre el género y la sexualidad en el área maya a comienzos del siglo XXI", authors: ["Conover Blancas, Carlos", "Hernández Reyes, Sara Raquel"] },
      { id: "t52-6", time: "12:00", title: "El regreso del profeta Enoc", authors: ["Avilez Tax, Gilberto Antonio"] },
    ]
  },
  {
    day: "vie03", id: "s53", title: "Mesa: Mujeres mayas de ayer y hoy",
    type: "sesion", room: "Aula 3", time: "12:30–14:00",
    talks: [
      { id: "t53-1", time: "12:30", title: "Espacio y género: identificar a las mujeres en las ciudades prehispánicas", authors: ["Kauffmann, Sarah"] },
      { id: "t53-2", time: "13:00", title: "El glifo de la \"vasija invertida\" y la maternidad sacralizada en el Clásico maya", authors: ["Gutiérrez González, María Eugenia"] },
      { id: "t53-3", time: "13:30", title: "Des(conexión) divina entre las mujeres. Un acercamiento a los ritos de menopausia en el área maya", authors: ["González Díaz, Vanessa"] },
    ]
  },
  {
    day: "vie03", id: "s54", title: "Simposio: Proyecto Catalogación, registro y análisis arqueométricos de los artefactos de Yaxchilán",
    type: "sesion", room: "Aula 4", time: "9:00–13:00",
    talks: [
      { id: "t54-1", time: "9:00", title: "Vicisitudes y resultados del proyecto \"Catalogación, registro y análisis arqueométricos de los artefactos de Yaxchilán\"", authors: ["Echauri Pérez, Ileana Edith", "Lozada Toledo, Josuhé"] },
      { id: "t54-2", time: "9:30", title: "Estudio bioantropológico integral de las personas sepultadas en Yaxchilán-Pa'Chan", authors: ["Lacoste Jeanson, Alizé", "Echauri Pérez, Ileana Edith", "Lozada Toledo, Josuhé"] },
      { id: "t54-3", time: "10:00", title: "Ritualidad y estratificación social en los contextos de Yaxchilán: un análisis interpretativo de seis tumbas del período Clásico Tardío", authors: ["Echauri Pérez, Ileana Edith", "Fierro Padilla, Rafael", "Lozada Toledo, Josuhé", "Lacoste Jeanson, Alizé"] },
      { id: "t54-4", time: "10:30", title: "Análisis de procedencia de la obsidiana de Yaxchilán. Implicaciones en redes de intercambio para el Clásico Tardío", authors: ["Acosta Ochoa, Guillermo", "Jiménez González, Berenice", "Echauri Pérez, Ileana Edith", "Lozada Toledo, Josuhé"] },
      { id: "t54-5", time: "11:00", title: "Uso y función de los artefactos de Yaxchilán: subsistencia y actividades rituales en el periodo Clásico Tardío", authors: ["Pérez Martínez, Patricia", "Echauri Pérez, Ileana Edith", "Lozada Toledo, Josuhé"] },
      { id: "t54-6", time: "12:00", title: "Los dioses-incensarios de los mayas lacandones vistos desde la arqueología relacional y la arqueometría", authors: ["Lozada Toledo, Josuhé", "Balsanelli, Alice"] },
      { id: "t54-7", time: "12:30", title: "La cerámica de pasta fina en Yaxchilán: producción local y dinámicas de consumo durante el Clásico Terminal", authors: ["Fierro Padilla, Rafael"] },
    ]
  },
  {
    day: "vie03", id: "s55", title: "Simposio: Globalización, acumulación por desposesión y culturas mayas",
    type: "sesion", room: "Aula 5", time: "9:00–12:30",
    talks: [
      { id: "t55-1", time: "9:00", title: "Ballets folklóricos: turismo, identidad, resignificación", authors: ["Quintal Avilés, Ella F."] },
      { id: "t55-2", time: "9:30", title: "Consumir comida de la milpa, una forma de resistencia entre los mayas contemporáneos", authors: ["Quiñones Vega, María Teresa"] },
      { id: "t55-3", time: "10:00", title: "El consumo de hipiles sublimados entre las mujeres mayas: despojo y afectación a la cultura, apropiación y resignificación", authors: ["Rejón Patrón, Lourdes Guadalupe"] },
      { id: "t55-4", time: "10:30", title: "Tradición y apropiación cultural en Uayma, Yucatán", authors: ["Cabrera Valenzuela, Alejandro"] },
      { id: "t55-5", time: "11:00", title: "Imposiciones, resignificaciones y apropiaciones. Bosquejo etnográfico sobre los santos en poblaciones mayas del Camino Real peninsular", authors: ["De Ángel García, David"] },
      { id: "t55-6", time: "12:00", title: "Co-creación de documentos doctrinales como resistencia ante visiones eurocéntricas", authors: ["Sánchez Suárez, Aurelio"] },
    ]
  },
  {
    day: "vie03", id: "s56", title: "Simposio: Avances en el estudio de regiones en el Área Maya: resultados de las investigaciones en el Tren Maya",
    type: "sesion", room: "Aula 6", time: "9:00–13:00",
    talks: [
      { id: "t56-1", time: "9:00", title: "Patrón de asentamiento y análisis regional a través de los datos del Tren Maya", authors: ["Pérez Rivas, Manuel Eduardo", "Velázquez Morlet, Adriana", "Echeverría Castillo, Susana", "Arce Acosta, Marisol"] },
      { id: "t56-2", time: "9:30", title: "Perspectivas sobre el concepto de \"sitio arqueológico\" y el paisaje urbano del sur de Campeche", authors: ["García Uitz, Ángel Juventino", "Velázquez Morlet, Adriana", "López Corral, Aurelio"] },
      { id: "t56-3", time: "10:00", title: "Avances en el estudio de patrón de asentamiento de Chichén Itzá: nuevos registros en el sector norte del sitio", authors: ["Osorio León, José Francisco Javier", "Pérez Ruiz, Francisco", "Gallegos Flores, Jesús Manuel"] },
      { id: "t56-4", time: "10:30", title: "Cansacbé, en el límite meridional de la provincia de Ah Canul", authors: ["Novelo Osorno, Sara María de las Mercedes", "Vera Estrada, Jaime Alberto"] },
      { id: "t56-5", time: "11:00", title: "Caracterización y distribución de los materiales malacológicos recuperados en el Tren Maya y su significación de uso social", authors: ["Arce Acosta, Marisol", "Dena Castro, Aldo Germán", "Pérez Rivas, Manuel Eduardo", "Pablo Pablo, Rocxana"] },
      { id: "t56-6", time: "12:00", title: "La cerámica del tramo 1 del Salvamento Arqueológico Tren Maya: relaciones culturales a través del tiempo en la zona de Candelaria, Campeche", authors: ["Ancona Aragón, Iliana Isabel", "Sosa Guillén, Omar Antonio", "Cetz Provedano, Paula Caridad", "Martínez Garrido, Mildred Gabriela"] },
      { id: "t56-7", time: "12:30", title: "Paaktzatz, análisis de un tipo cerámico ceremonial en el sur de Campeche y Quintana Roo", authors: ["Velázquez Morlet, Adriana"] },
    ]
  },
  {
    day: "vie03", id: "s57", title: "Mesa: Lingüística: historia, contacto, variación y documentación",
    type: "sesion", room: "Aula 7", time: "9:00–13:00",
    talks: [
      { id: "t57-1", time: "9:00", title: "El lingüista Morris Swadesh: precursor en el uso de técnicas computacionales para el estudio de las lenguas mayas", authors: ["Álvarez Sánchez, Adriana"] },
      { id: "t57-2", time: "9:30", title: "La clasificación de las lenguas mayas: entre el modelo arbóreo y el contacto lingüístico", authors: ["Korovina, Evgeniya"] },
      { id: "t57-3", time: "10:00", title: "Palabras mayas navegando en el espacio-tiempo: análisis computacional del contacto", authors: ["Becquey, Cédric"] },
      { id: "t57-4", time: "10:30", title: "Estudio comparativo de la semántica de los olores y sabores entre los mayas prehispánicos y los tének actuales", authors: ["Meléndez Guadarrama, Lucero"] },
      { id: "t57-5", time: "11:00", title: "De documento colonial a recurso educativo bilingüe intercultural: Vocabulario de la lengua cakchiquel de Fray Thomás de Coto", authors: ["Guarcax González, José Celestino", "Tol Pocón, Vilma Luciana", "Yaxón Yaxón, Juana María"] },
      { id: "t57-6", time: "12:00", title: "La variación dialectal del maya yucateco", authors: ["Blaha Pfeiler, Barbara"] },
      { id: "t57-7", time: "12:30", title: "Estudio sobre las restricciones de animacidad en construcciones transitivas en la lengua chol", authors: ["Vázquez Álvarez, Juan Jesús"] },
    ]
  },
  {
    day: "vie03", id: "s58", title: "Simposio: Nuevas prácticas orales y escritas mayas: dinámicas de creatividad lingüística y textual",
    type: "sesion", room: "Aula 8", time: "9:00–13:00",
    talks: [
      { id: "t58-1", time: "9:00", title: "Del glifo a la letra: metafonética kaqchikel y el alfabeto colonial", authors: ["Romero Florián, Sergio Francisco"] },
      { id: "t58-2", time: "9:30", title: "Prácticas de la escritura de la lengua maya en Naranjal Poniente, Quintana Roo. Del papel a las piedras y los medios digitales", authors: ["Chi Canul, Hilario"] },
      { id: "t58-3", time: "10:00", title: "Atribuciones léxicas de género a la luna en el maya yucateco: el caso de Espita, Yucatán", authors: ["Petul Cuxim, Luis Alfonso"] },
      { id: "t58-4", time: "10:30", title: "Los géneros discursivos en el maya yucateco", authors: ["Petatillo Chan, Rodrigo"] },
      { id: "t58-5", time: "11:00", title: "Focos de creatividad y poética emergente en el habla ritual maya", authors: ["Vapnarsky, Valentina"] },
      { id: "t58-6", time: "12:00", title: "Caminos de los rezos. Evoluciones estructurales y prosódicas en las formas de rezar de San Pedro Chanal, Chiapas", authors: ["Montes Lara, Laura Audrey"] },
      { id: "t58-7", time: "12:30", title: "La ley en palabras propias: dinámicas creativas del vocabulario jurídico tseltal contemporáneo", authors: ["Chosson, Marie"] },
    ]
  },
  {
    day: "vie03", id: "s59", title: "Simposio: Nuevas perspectivas de la semiótica étnica en los estudios mayas",
    type: "sesion", room: "Aula 9", time: "9:00–12:30",
    talks: [
      { id: "t59-1", time: "9:00", title: "Cristianismo ortodoxo entre las comunidades mayas de Guatemala y México", authors: ["Ershova, Galina"] },
      { id: "t59-2", time: "9:30", title: "Espacio, fascinación y legitimación del poder en la cultura maya", authors: ["Rivera Castillo, Patricia"] },
      { id: "t59-3", time: "10:00", title: "\"Ligas de resistencia\" y la formación de los espacios socioculturales para la ilustración de la población maya de Yucatán (1922-1924)", authors: ["Molodchikova, Tatiana"] },
      { id: "t59-4", time: "10:30", title: "Representaciones del mundo acuático en la iconografía monumental de la Costa del Pacífico sureste de Mesoamérica del período Preclásico Tardío", authors: ["Borísova, Galina"] },
      { id: "t59-5", time: "11:00", title: "Los altares sin inscripciones jeroglíficas de Tikal", authors: ["Vepretskii, Sergei", "Beliaev, Dmitri"] },
      { id: "t59-6", time: "12:00", title: "Las cuevas como objeto ritual y lugar de memoria en la cultura maya", authors: ["Khokhriakova Viskanta, Sandra"] },
    ]
  },
  {
    day: "vie03", id: "s-clausura", title: "Conferencia de clausura",
    type: "plenaria", room: "Teatro Benemérito Instituto Campechano", time: "17:00–18:00",
    talks: [
      { id: "tc-1", time: "17:00", title: "Navegantes del tiempo: sabiduría maya y continuidad histórica de los pueblos mayas", authors: ["Menchú Tum, Rigoberta"] },
      { id: "tc-2", time: "18:00", title: "Ceremonia de clausura", authors: [] },
    ]
  },
  // === SÁBADO 4 ===
  {
    day: "sab04", id: "s-visita", title: "Visita guiada",
    type: "plenaria", room: "Xcalumkin / Museo Arqueología Maya del Camino Real de Hecelchakán",
    talks: [
      { id: "tv-1", time: "", title: "Visita al sitio arqueológico de Xcalumkin y al Museo de Arqueología Maya del Camino Real de Hecelchakán", authors: ["Velázquez Morlet, Adriana", "Novelo Osorno, Sara", "Torres Marzo, Ricardo"] },
    ]
  },
];

const STORAGE_KEY = "mayistas2026_favorites";

function loadFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function saveFavorites(favs) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(favs)); } catch {}
}

// Share helpers
function encodeShare(favorites) {
  const ids = Object.keys(favorites);
  return btoa(ids.join(",")).replace(/=/g, "");
}

function decodeShare(str) {
  try {
    const padded = str + "=".repeat((4 - str.length % 4) % 4);
    const ids = atob(padded).split(",").filter(Boolean);
    const obj = {};
    ids.forEach(id => { obj[id] = true; });
    return obj;
  } catch { return null; }
}

function getShareParam() {
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get("share") || null;
  } catch { return null; }
}

function buildShareUrl(favorites) {
  const encoded = encodeShare(favorites);
  const base = window.location.href.split("?")[0];
  return `${base}?share=${encoded}`;
}

export default function App() {
  const [tab, setTab] = useState("days");
  const [selectedDay, setSelectedDay] = useState("lun29");
  const [openSections, setOpenSections] = useState({});
  const [favorites, setFavorites] = useState(loadFavorites);
  const [searchQuery, setSearchQuery] = useState("");
  const [shareUrl, setShareUrl] = useState(null);
  const [shareCopied, setShareCopied] = useState(false);
  const [incomingShare, setIncomingShare] = useState(null); // {favs, count} from URL

  useEffect(() => { saveFavorites(favorites); }, [favorites]);

  // On mount: check if URL has a shared list
  useEffect(() => {
    const param = getShareParam();
    if (!param) return;
    const decoded = decodeShare(param);
    if (!decoded) return;
    // Count how many IDs are valid talk IDs
    const allIds = new Set();
    for (const s of SCHEDULE) for (const t of s.talks) allIds.add(t.id);
    const valid = {};
    let count = 0;
    for (const id of Object.keys(decoded)) {
      if (allIds.has(id)) { valid[id] = true; count++; }
    }
    if (count > 0) setIncomingShare({ favs: valid, count });
    // Clean URL without reloading
    try {
      window.history.replaceState({}, "", window.location.pathname);
    } catch {}
  }, []);

  const toggleSection = (id) => setOpenSections(p => ({ ...p, [id]: !p[id] }));

  const toggleFav = (talkId) => {
    setFavorites(p => {
      const next = { ...p };
      if (next[talkId]) delete next[talkId];
      else next[talkId] = true;
      return next;
    });
  };

  const handleShare = () => {
    const url = buildShareUrl(favorites);
    setShareUrl(url);
    setShareCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    }).catch(() => {
      // fallback
      const el = document.createElement("textarea");
      el.value = shareUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    });
  };

  const handleMergeIncoming = () => {
    if (!incomingShare) return;
    setFavorites(p => ({ ...p, ...incomingShare.favs }));
    setIncomingShare(null);
  };

  const daySchedule = useMemo(() =>
    SCHEDULE.filter(s => s.day === selectedDay),
    [selectedDay]
  );

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    const results = [];
    for (const section of SCHEDULE) {
      for (const talk of section.talks) {
        const authorsStr = talk.authors.join(" ").toLowerCase();
        if (authorsStr.includes(q)) {
          results.push({ section, talk });
        }
      }
    }
    return results;
  }, [searchQuery]);

  const [openMyDays, setOpenMyDays] = useState({});
  const toggleMyDay = (id) => setOpenMyDays(p => ({ ...p, [id]: !p[id] }));

  const mySchedule = useMemo(() => {
    const items = [];
    for (const section of SCHEDULE) {
      for (const talk of section.talks) {
        if (favorites[talk.id]) items.push({ section, talk });
      }
    }
    // group by day, sort chronologically within each day
    const byDay = {};
    for (const item of items) {
      if (!byDay[item.section.day]) byDay[item.section.day] = [];
      byDay[item.section.day].push(item);
    }
    for (const dayId of Object.keys(byDay)) {
      byDay[dayId].sort((a, b) => {
        const ta = a.talk.time || "99:99";
        const tb = b.talk.time || "99:99";
        return ta.localeCompare(tb);
      });
    }
    return byDay;
  }, [favorites]);

  const favCount = Object.keys(favorites).length;

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#f7f4ef", minHeight: "100vh", maxWidth: 800, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ background: "#1a2744", color: "#fff", padding: "16px 20px 0" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 2, color: "#c9a96e", marginBottom: 4 }}>XIII Congreso Internacional de Mayistas · 2026</div>
        <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 14 }}>Los mayas: navegantes del tiempo</div>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 2 }}>
          {[
            { key: "days", label: "Por día" },
            { key: "my", label: `Mi programa${favCount > 0 ? ` (${favCount})` : ""}` },
            { key: "search", label: "Búsqueda" },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              style={{
                padding: "8px 16px", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
                borderRadius: "6px 6px 0 0",
                background: tab === t.key ? "#f7f4ef" : "transparent",
                color: tab === t.key ? "#1a2744" : "#c9c3b8",
              }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "16px 16px 40px" }}>

        {/* TAB: По дням */}
        {tab === "days" && (
          <>
            {/* Day selector */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
              {DAYS.map(d => (
                <button key={d.id} onClick={() => { setSelectedDay(d.id); setOpenSections({}); }}
                  style={{
                    padding: "6px 12px", border: "2px solid", borderRadius: 20, cursor: "pointer",
                    fontSize: 12, fontWeight: 600,
                    borderColor: selectedDay === d.id ? "#1a2744" : "#d4ccbc",
                    background: selectedDay === d.id ? "#1a2744" : "#fff",
                    color: selectedDay === d.id ? "#fff" : "#555",
                  }}>
                  {d.short}
                </button>
              ))}
            </div>

            <div style={{ fontSize: 13, color: "#888", marginBottom: 12 }}>
              {DAYS.find(d => d.id === selectedDay)?.label}
            </div>

            {daySchedule.length === 0 && (
              <div style={{ color: "#888", padding: 20, textAlign: "center" }}>No hay datos para este día</div>
            )}

            {daySchedule.map(section => (
              <SectionCard key={section.id} section={section}
                isOpen={!!openSections[section.id]}
                onToggle={() => toggleSection(section.id)}
                favorites={favorites} onToggleFav={toggleFav} />
            ))}
          </>
        )}

        {/* TAB: Mi programa */}
        {tab === "my" && (
          <>
            {/* Incoming shared list banner */}
            {incomingShare && (
              <div style={{ background: "#1a2744", color: "#fff", borderRadius: 10, padding: "14px 16px", marginBottom: 14, display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ fontSize: 22, flexShrink: 0 }}>📩</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
                    Alguien compartió su programa contigo
                  </div>
                  <div style={{ fontSize: 13, color: "#c9c3b8", marginBottom: 10 }}>
                    Contiene {incomingShare.count} ponencia{incomingShare.count !== 1 ? "s" : ""}. ¿Quieres añadirlas a tu programa?
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={handleMergeIncoming}
                      style={{ padding: "7px 16px", background: "#c9a96e", color: "#1a2744", border: "none", borderRadius: 6, cursor: "pointer", fontWeight: 700, fontSize: 13 }}>
                      Añadir a mi programa
                    </button>
                    <button onClick={() => setIncomingShare(null)}
                      style={{ padding: "7px 14px", background: "transparent", color: "#aaa", border: "1px solid #aaa", borderRadius: 6, cursor: "pointer", fontSize: 13 }}>
                      Ignorar
                    </button>
                  </div>
                </div>
              </div>
            )}

            {favCount === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 20px", color: "#888" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>★</div>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Tu programa está vacío</div>
                <div style={{ fontSize: 13 }}>Añade ponencias a favoritos pulsando ★ en «Por día» o «Búsqueda»</div>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
                  <div style={{ fontSize: 13, color: "#888" }}>
                    Ponencias seleccionadas: {favCount}. Si varias coinciden en el mismo horario, se muestran juntas.
                  </div>
                  <button onClick={handleShare}
                    style={{ padding: "7px 14px", background: "#1a2744", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                    🔗 Compartir mi programa
                  </button>
                </div>

                {/* Share URL panel */}
                {shareUrl && (
                  <div style={{ background: "#fff", border: "1px solid #d4ccbc", borderRadius: 8, padding: "12px 14px", marginBottom: 14 }}>
                    <div style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>
                      Copia este enlace y compártelo. Quien lo abra podrá añadir tus ponencias a su programa.
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <input readOnly value={shareUrl}
                        style={{ flex: 1, padding: "7px 10px", fontSize: 12, border: "1px solid #d4ccbc", borderRadius: 6, background: "#f7f4ef", color: "#555", minWidth: 0 }} />
                      <button onClick={handleCopy}
                        style={{ padding: "7px 14px", background: shareCopied ? "#2a7a4b" : "#c9a96e", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: 600, flexShrink: 0, transition: "background 0.2s" }}>
                        {shareCopied ? "✓ Copiado" : "Copiar"}
                      </button>
                    </div>
                  </div>
                )}
                {DAYS.map(day => {
                  const items = mySchedule[day.id];
                  if (!items || items.length === 0) return null;
                  const isOpen = !!openMyDays[day.id];
                  return (
                    <div key={day.id} style={{ background: "#fff", borderRadius: 10, marginBottom: 10, border: "2px solid #c9a96e", overflow: "hidden" }}>
                      <button onClick={() => toggleMyDay(day.id)}
                        style={{ width: "100%", textAlign: "left", padding: "12px 14px", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "#c9a96e" }}>
                            {day.label}
                          </div>
                          <div style={{ fontSize: 12, color: "#aaa", marginTop: 2 }}>{items.length} ponencia{items.length !== 1 ? "s" : ""}</div>
                        </div>
                        <div style={{ fontSize: 18, color: "#c9a96e", flexShrink: 0 }}>{isOpen ? "▲" : "▼"}</div>
                      </button>
                      {isOpen && (
                        <div style={{ borderTop: "1px solid #f0e8dc" }}>
                          {items.map(({ section, talk }) => (
                            <TalkRow key={talk.id} talk={talk} section={section}
                              isFav={!!favorites[talk.id]} onToggleFav={toggleFav} showSection />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </>
            )}
          </>
        )}

        {/* TAB: Búsqueda */}
        {tab === "search" && (
          <>
            <div style={{ marginBottom: 16 }}>
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Escriba el nombre o apellido del autor..."
                style={{
                  width: "100%", padding: "10px 14px", fontSize: 14, border: "2px solid #d4ccbc",
                  borderRadius: 8, outline: "none", background: "#fff", boxSizing: "border-box",
                }}
              />
            </div>
            {searchQuery.trim() && searchResults.length === 0 && (
              <div style={{ color: "#888", textAlign: "center", padding: 20 }}>Sin resultados</div>
            )}
            {searchResults.map(({ section, talk }) => (
              <TalkRow key={talk.id} talk={talk} section={section}
                isFav={!!favorites[talk.id]} onToggleFav={toggleFav} showSection />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

function SectionCard({ section, isOpen, onToggle, favorites, onToggleFav }) {
  const isPlenaria = section.type === "plenaria";
  const favInSection = section.talks.filter(t => favorites[t.id]).length;

  return (
    <div style={{
      background: "#fff", borderRadius: 10, marginBottom: 10,
      border: isPlenaria ? "2px solid #c9a96e" : "1px solid #e0d8cc",
      overflow: "hidden",
    }}>
      <button onClick={onToggle} style={{
        width: "100%", textAlign: "left", padding: "12px 14px",
        background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 10,
      }}>
        <div style={{ flex: 1 }}>
          {isPlenaria && (
            <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1, color: "#c9a96e", fontWeight: 700, marginBottom: 2 }}>
              Пленарное заседание
            </div>
          )}
          <div style={{ fontSize: 14, fontWeight: 700, color: "#1a2744", lineHeight: 1.3 }}>{section.title}</div>
          <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>
            {section.room}{section.time ? ` · ${section.time}` : ""}
            {favInSection > 0 && <span style={{ color: "#c9a96e", marginLeft: 8 }}>★ {favInSection}</span>}
          </div>
        </div>
        <div style={{ fontSize: 18, color: "#999", marginTop: 2, flexShrink: 0 }}>{isOpen ? "▲" : "▼"}</div>
      </button>

      {isOpen && (
        <div style={{ borderTop: "1px solid #f0e8dc" }}>
          {section.talks.map(talk => (
            <TalkRow key={talk.id} talk={talk} section={section}
              isFav={!!favorites[talk.id]} onToggleFav={onToggleFav} />
          ))}
        </div>
      )}
    </div>
  );
}

function TalkRow({ talk, section, isFav, onToggleFav, showSection }) {
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: 10,
      padding: "10px 14px",
      borderBottom: "1px solid #f7f4ef",
      background: isFav ? "#fffbf3" : "transparent",
    }}>
      <div style={{ width: 42, flexShrink: 0, fontSize: 12, color: "#999", paddingTop: 2, fontVariantNumeric: "tabular-nums" }}>
        {talk.time || ""}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#1a2744", lineHeight: 1.4 }}>{talk.title}</div>
        {talk.authors.length > 0 && (
          <div style={{ fontSize: 12, color: "#777", marginTop: 3 }}>{talk.authors.join(", ")}</div>
        )}
        {showSection && (
          <div style={{ fontSize: 11, color: "#aaa", marginTop: 3 }}>
            {section.room} · {DAYS.find(d => d.id === section.day)?.label}
            {talk.time ? ` · ${talk.time}` : ""}
          </div>
        )}
      </div>
      {talk.authors.length > 0 && (
        <button onClick={() => onToggleFav(talk.id)}
          style={{
            background: "none", border: "none", cursor: "pointer",
            fontSize: 20, color: isFav ? "#c9a96e" : "#ccc",
            flexShrink: 0, padding: "0 2px", lineHeight: 1,
          }}
          title={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}>
          ★
        </button>
      )}
    </div>
  );
}
