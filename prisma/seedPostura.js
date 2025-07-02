import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Sembrando posturas...');

    const posturas = [
        {
            nameEs: "Estiramiento abdominal",
            nameSans: "Bhujangasana (भुजङ्गासन)",
            instructions: `Acuéstate boca abajo con las piernas estiradas y juntas.
Coloca las palmas de las manos debajo de los hombros.
Inhala y comienza a elevar lentamente el torso, estirando la parte frontal del abdomen.
Mantén los codos ligeramente doblados y los hombros alejados de las orejas.
Mantén la mirada al frente o ligeramente hacia arriba sin forzar el cuello.
Respira profundamente y mantén por algunos segundos.`,
            benefits: `Estira profundamente la musculatura abdominal.
Alivia la rigidez lumbar y mejora la flexibilidad de la columna.
Estimula órganos internos como los riñones y el hígado.`,
            modifications: `Si hay molestia en la zona baja de la espalda, apóyate solo en los antebrazos (versión "Sphinx").
Puedes colocar una manta debajo del pubis para mayor comodidad.`,
            warnings: "",
            image: "https://cdn.xuanlanyoga.com/wp-content/uploads/2017/05/postura-de-la-cobra.jpg",
            video: "https://www.youtube.com/embed/HFdPd47QQ0I?start=5"
        },
        {
            nameEs: "Postura del plátano",
            nameSans: "Bananasana  (बनानासन)",
            instructions: `Acuéstate boca arriba con las piernas extendidas.
Desliza ambas piernas hacia un lado (ej. derecha) sin levantar la cadera.
Lleva los brazos por encima de la cabeza, también hacia ese lado.
El cuerpo adopta una forma de media luna o plátano.
Mantén de por un rato, luego cambia de lado.`,
            benefits: `Estira los músculos laterales del torso y la espalda baja.
Estimula los meridianos de riñón y vesícula biliar (Yin Yoga).
Relaja profundamente el cuerpo.`,
            modifications: `Coloca soporte (cojín o manta) bajo piernas o brazos.
Dobla ligeramente las rodillas si hay tensión lumbar.`,
            warnings: "",
            image: "https://kavaalya.com/wp-content/uploads/2020/10/postura-platano-yoga.jpg",
            video: "https://www.youtube.com/embed/F3eriQJq69A?start=5"
        },
        {
            nameEs: "Postura de la mariposa",
            nameSans: "Baddha Konasana (बद्ध कोणासन)",
            instructions: `Siéntate con la espalda recta y junta las plantas de los pies.
Deja caer las rodillas hacia los lados.
Sujeta los pies con las manos.
Puedes inclinarte hacia adelante suavemente con la espalda recta.
Mantén la postura por un tiempo.`,
            benefits: `Abre las caderas y mejora la circulación en la zona pélvica.
Estira la parte interna de los muslos.
Calma el sistema nervioso.`,
            modifications: `Coloca bloques o almohadas bajo las rodillas si no bajan completamente.
Si hay molestia en la espalda baja, mantente erguido.`,
            warnings: "",
            image: "https://xuanlanyoga.com/wp-content/uploads/2021/01/baddha-konasana-750x750.jpg",
            video: "https://www.youtube.com/embed/kfMvTtByPlQ?start=5"
        },
        {
            nameEs: "Ángulo lateral extendido con brazos enlazados",
            nameSans: "Baddha Utthita Parsvakonasana (बद्ध उत्तित पार्श्वकोणासन)",
            instructions: `Da un paso largo hacia los lados, gira un pie hacia afuera y dobla esa rodilla.
Apoya el antebrazo sobre el muslo o la mano en el suelo.
Lleva el brazo superior por detrás de la espalda.
Intenta enlazar ambas manos por debajo del muslo de la pierna flexionada.
Gira el pecho hacia arriba y mira al cielo. `,
            benefits: `Estira intensamente piernas, caderas y costados.
Fortalece muslos y columna.
Mejora el equilibrio y la concentración. `,
            modifications: `Usa una correa para enlazar las manos si no llegan.
Apoya el antebrazo en el muslo si el suelo está muy lejos. `,
            warnings: "",
            image: "https://www.theyogacollective.com/wp-content/uploads/2019/11/Bound-extended-side-angle-for-pose-page-1200x800.jpeg",
            video: "https://www.youtube.com/embed/skwgxsX7sO0?start=10"
        },
        {
            nameEs: "Media torsión del señor de los peces III",
            nameSans: "Ardha Matsyendrasana (अर्ध मत्स्येन्द्रासन)",
            instructions: `Siéntate con la pierna derecha cruzada sobre la izquierda, que se mantiene doblada.
Apoya el pie derecho fuera del muslo izquierdo.
Coloca la mano derecha detrás del sacro.
El codo izquierdo va fuera de la rodilla derecha para ayudarte a girar el torso.
Inhala alargando la columna, exhala y profundiza la torsión.
Apoya el pie derecho fuera del muslo izquierdo.
Coloca la mano derecha detrás del sacro.
El codo izquierdo va fuera de la rodilla derecha para ayudarte a girar el torso.
Inhala alargando la columna, exhala y profundiza la torsión.`,
            benefits: `Estimula el hígado y los riñones.
Mejora la digestión.
Estira hombros, cuello y columna.`,
            modifications: "Mantén la pierna estirada si hay molestia.\n\nUsa una manta bajo los glúteos si te cuesta mantener la espalda recta.",
            warnings: "",
            image: "https://cdn.yogajournal.com/wp-content/uploads/2007/08/Half-Lord-of-the-Fishes-Mod-1_Andrew-Clark_1.jpg?width=1400",
            video: "https://www.youtube.com/embed/GKEtI-YALKQ?start=20"
        },
        {
            nameEs: "Postura del ángulo lateral extendido",
            nameSans: "Utthita Parsvakonasana (उत्तित पार्श्वकोणासन)",
            instructions: `Desde una posición amplia, gira el pie derecho y flexiona la rodilla.
Apoya el antebrazo sobre el muslo o la mano en el suelo junto al pie.
Estira el brazo izquierdo por encima de la cabeza en línea recta.
Gira el pecho hacia arriba y alarga desde el talón trasero hasta la punta de los dedos.
Mantén por un tiempo.`,
            benefits: `Estira piernas, ingles y costados.
Fortalece muslos, glúteos y columna.
Mejora la resistencia y el equilibrio.`,
            modifications: "Usa un bloque bajo la mano si no llegas al suelo.\n\nMantén el antebrazo sobre el muslo si hay incomodidad.",
            warnings: "",
            image: "https://www.yogisima.com/app/uploads/2019/04/Utthita-Parsvakonasana.jpg",
            video: "https://www.youtube.com/embed/zipcih4ImoI?start=9"
        },
        {
            nameEs: "Silla en torsión",
            nameSans: "Parivrtta Utkatasana (परिवृत्त उत्कटासन)",
            instructions: `Ponte de pie, junta los pies y dobla las rodillas como si te sentaras.
Junta las palmas frente al pecho .
Gira el torso hacia la derecha, llevando el codo izquierdo por fuera de la rodilla derecha.
Mantén las caderas alineadas y los muslos paralelos al suelo.
Mantén la postura durante varias respiraciones, luego cambia de lado.`,
            benefits: `Estimula el sistema digestivo y desintoxica órganos internos.
Fortalece piernas y glúteos.
Mejora el equilibrio y la concentración.`,
            modifications: "Si no puedes llevar el codo fuera de la rodilla, gira solo el torso.\n\nRealiza la torsión con apoyo en una silla si tienes problemas de equilibrio.",
            warnings: "",
            image: "https://www.ictiva.com/blog/wp-content/uploads/2023/03/silla-torsi%C3%B3n.jpg",
            video: "https://www.youtube.com/embed/QexlMQ0IEbU?start=3"
        },
        {
            nameEs: "Gesto de oración",
            nameSans: "Anjali Mudra (अञ्जलि मुद्रा)",
            instructions: `Siéntate con la columna recta y los hombros relajados. 
Junta las palmas frente al pecho en señal de respeto. 
Cierra los ojos y lleva tu atención a la respiración. 
Mantén la postura durante un tiempo.`,
            benefits: `Calma la mente y equilibra la energía.
Estimula el sistema nervioso parasimpático. 
Fomenta la concentración y el enfoque interior.`,
            modifications: `Puedes apoyar los pulgares en el esternón para mayor estabilidad. 
Si hay tensión en hombros, mantén las palmas ligeramente separadas.`,
            warnings: "",
            image: "https://thumbs.dreamstime.com/b/gesto-apan-vayu-mudra-lifesaver-vector-188714128.jpg",
            video: "https://www.youtube.com/embed/uW33S26L2q8?start=9"
        },
        {
            nameEs: "Torsión abdominal en el suelo",
            nameSans: "Jathara Parivartanasana (जठर परिवर्तनासन)",
            instructions: `Acuéstate boca arriba con los brazos en forma de cruz.
Lleva las rodillas al pecho y luego bájalas hacia un lado.
Gira la cabeza hacia el lado opuesto de las piernas.
Mantén los hombros en el suelo.
Respira profundamente varias veces, luego cambia de lado.`,
            benefits: `Masajea los órganos internos.
Alivia la tensión lumbar.
Estimula la digestión y elimina toxinas.`,
            modifications: `Coloca un cojín bajo las rodillas si no llegan al suelo.
Mantén una pierna extendida si hay incomodidad en la espalda baja.`,
            warnings: "",
            image: "https://www.yoga2hear.co.uk/cdn/shop/articles/lying_spinal_twist_2000x.jpg?v=1581552134",
            video: "https://www.youtube.com/embed/s9S_ffW0Fi8?start=15"
        },
        {
            nameEs: "Respiración del zumbido de abeja",
            nameSans: "Bhramari Pranayama (भ्रामरी प्राणायाम)",
            instructions: `Siéntate con la espalda recta.
Cierra los ojos y tapa los oídos con los pulgares.
Coloca los otros dedos sobre los ojos, nariz y labios para aislar los sentidos.
Inhala profundamente y al exhalar haz un zumbido suave como una abeja.
Repite.`,
            benefits: `Reduce la ansiedad, el estrés y mejora la concentración.
Calma el sistema nervioso.
Ayuda a aliviar dolores de cabeza y tensión.`,
            modifications: `Si sientes incomodidad al tapar los oídos, simplemente haz el zumbido sin usar las manos.
Realiza la práctica en un lugar tranquilo.`,
            warnings: "",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfAnFsT6OTTSMuE70ZsjuxzdrX_VrKOxNfMieRyRwnaNwrEE_yC_YPOGrN9024CkIDBmE&usqp=CAU",
            video: "https://www.youtube.com/embed/l0bym1F0QWA?start=17",
        },

        {
            nameEs: "Postura del niño",
            nameSans: "Bālāsana (बालासन)",
            instructions: `Comienza en una posición de rodillas, con los dedos gordos de los pies juntos y las rodillas separadas al ancho de las caderas. Baja el torso hacia el suelo, estirando los brazos hacia adelnta o dejándolos a los lados del cuerpo. Relaja la cabeza y el cuello, descansando la frente en el suelo. Respira profundamente, mantén la postura unos minutos.`,
            benefits: `Alivia tensiones en la espalda, cuello y hombros. Estira los muslos, las caderas y los tobillos. Calma la mente y reduce el estrés. Mejora la circulación.`,
            modifications: `Usa un bloque bajo la frente si no puedes tocar el suelo. Si las rodillas te duelen, coloca una manta o cojín entre las rodillas y el suelo.`,
            warnings: "",
            image: "https://tse3.mm.bing.net/th/id/OIP._dedNKSjNQ3WJtR3l8ipvwHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
            video: "https://youtu.be/CLlAUN_r75k?si=V_gMfN5vWId68kBK&t=59",
        },

        {
            nameEs: "Puente",
            nameSans: "Setu Bandhasana (सेतुबंधासन)",
            instructions: `Acuéstate boca arriba. Dobla las rodillas. Coloca los pies en el suelo, con los talones cerca de los huesos del asiento. Presiona los pies internos y los brazos contra el suelo. Empuja el cóccix hacia arriba. Levanta las caderas. Entrelaza las manos debajo de la pelvis.`,
            benefits: `Estiramiento de pecho, cuello y columna. Reduce el dolor de espalda.`,
            modifications: `A) Puente bebé (elevar hasta una posición cómoda). B) Puente con una manta debajo de los hombros. C) Puente con una pierna elevada. D) Entrelazar las manos alrededor de los tobillos. E) Bloque debajo de los hombros. F) Bloque o cojín debajo de la parte baja de la espalda. G) Pies cerca de una pared para evitar deslizamientos.`,
            warnings: "",
            image: "https://www.gaia.com/wp-content/uploads/Bridge_DaynaSeraye.jpg",
            video: "https://www.youtube.com/watch?v=IILwivZf-XA",
        },

        {
            nameEs: "Media luna",
            nameSans: "Ardha Chandrasana (अर्धचन्द्रासन)",
            instructions: `Comienza en la postura de la montaña. Da un gran paso hacia atrás con el pie derecho y gira el pie hacia un lado del mat. Extiende los brazos en forma de "T", con las palmas hacia abajo. Coloca la mano derecha sobre la cadera. Desplaza el peso hacia la pierna izquierda mientras levantas el pie derecho del suelo. Coloca la mano izquierda en el suelo o sobre un bloque, abriendo bien los dedos. Mira hacia abajo y levanta la pierna derecha hasta que esté paralela al suelo. Estira la pierna izquierda, manteniéndola recta, y finalmente, levanta el brazo derecho hacia el cielo.`,
            benefits: `Fortalece los abdominales y los muslos. Estira las piernas, los hombros y la columna vertebral.`,
            modifications: `De espaldas a la pared. Coloca un bloque debajo de la mano.`,
            warnings: "",
            image: "https://www.yogaes.com/img/asanas/medialuna.jpg",
            video: "https://youtu.be/8vROKGeU8e0?si=YUHxIgCWIZ7Pa8bQ&t=15",
        },

        {
            nameEs: "Postura del cocodrilo",
            nameSans: "Makarasana (मकरासन) ",
            instructions: `Relájate sobre el estómago. Coloca los brazos doblados en el suelo por encima de la cabeza. Abre las piernas. Gira los pies para que los talones apunten hacia adentro. Aprieta los glúteos y presiona la pelvis contra el suelo. Descansa la frente sobre los brazos.`,
            benefits: `Estira la espalda, las piernas y los glúteos. Reduce el estrés y mejora la postura.`,
            modifications: `Coloca la frente en Yoni Mudra.`,
            warnings: "",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtGpehf_KIZM7sBxNhqdm3SX6tHOCppE4FJg&s",
            video: "https://youtu.be/z_2USlkA5x0?si=bpSq9BZi6l35f5uh&t=12",
        },

        {
            nameEs: "Postura del saltamonte o langosta",
            nameSans: "Salabhasana (शलभासन)",
            instructions: `Acuéstate boca abajo. Junta los pies y apoya la frente en el suelo. Coloca los brazos a los lados del cuerpo, con las palmas hacia arriba. Estira ligeramente el mentón hacia adelante y descansa el mentón sobre el suelo. Relaja la parte frontal del cuerpo. Eleva el pecho, las piernas y los brazos del suelo. Extiende los dedos de las manos hacia los pies. Mira al frente.`,
            benefits: `Tonifica los músculos de la espalda. Estimula la zona lumbar.`,
            modifications: `Una pierna arriba. Piernas separadas. Manos debajo del cuerpo, a los lados o al frente.`,
            warnings: "",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Salabhasana_%28cropped%29.jpg/330px-Salabhasana_%28cropped%29.jpg",
            video: "https://youtu.be/ccuTgvVe7To?si=jGNYHVgE2vYdDWUI",
        },

        {
            nameEs: "Postura de la reverencia",
            nameSans: "Naman Pranamasana (प्रणामासन)",
            instructions: `Siéntate sobre las rodillas. Agarra las pantorrillas por debajo de las piernas. Inclínate hacia adelante y coloca la coronilla de la cabeza en el suelo frente a las rodillas. Eleva los glúteos hasta que los muslos estén verticales. Presiona suavemente el mentón contra el pecho. Mantén la postura.`,
            benefits: `Activa el núcleo (core). Es una preparación para las posturas de cabeza y hombros.`,
            modifications: `Postura Headstand`,
            warnings: "",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9sGYFzcnNxX1BHRkzMHPnL2Qg2U8KSApk1w&s",
            video: "https://www.youtube.com/watch?v=3lcIwnLWN2E",
        },

        {
            nameEs: "Postura del arco",
            nameSans: "Dhanurasana (धनुरासन)",
            instructions: `Acuéstate boca abajo con los brazos a los lados del cuerpo. Doble las rodillas y flexiona los pies. Levanta el pecho y mira hacia adelante. Alcanza los pies con las manos y agarra los tobillos. Aprieta los muslos. Luego, suelta la postura.`,
            benefits: `Estira los muslos, la ingle, los abdominales, el pecho, la garganta y los flexores de la cadera.`,
            modifications: `Usa una correa.`,
            warnings: "",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Dhanurasana_Yoga-Asana_Nina-Mel.jpg/500px-Dhanurasana_Yoga-Asana_Nina-Mel.jpg",
            video: "https://youtu.be/c4xTHERsr7Q?si=kg3TSYhQZFHo6lkA&t=265",
        },
        {
            nameEs: "Pose del camello",
            nameSans: "Ustrasana (उष्ट्रासन)",
            instructions: `Póstrate de rodillas. Coloca las manos sobre la parte baja de la pelvis, con los dedos apuntando hacia abajo. Inclínate hacia atrás, manteniendo el mentón cerca del esternón. Presiona las palmas de las manos contra los talones. Asegúrate de que los pliegues de los codos apunten hacia adelante. Para salir de la postura, lleva una mano a la vez a las caderas. Levanta la cabeza y el torso empujando los puntos de la cadera hacia abajo.`,
            benefits: `Estira los tobillos, los muslos, la ingle, los abdominales, el pecho, la garganta y el psoas.`,
            modifications: `Las palmas contra las plantas de los pies.`,
            warnings: "",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Ustrasana_Yoga-Asana_Nina-Mel.jpg/330px-Ustrasana_Yoga-Asana_Nina-Mel.jpg",
            video: "https://youtu.be/vlNLJ-mVWHM?si=27inGh4YLH_GiIbU&t=183",
        },

        {
            nameEs: "Postura del gato",
            nameSans: "Marjariasana (मार्जरीआसन)",
            instructions: `Comienza en una posición neutral. Coloca las muñecas debajo de los hombros, con los brazos a la altura de los hombros. Lleva el ombligo hacia la parte baja de la espalda. Arquea la espalda hacia atrás y mete el mentón hacia el pecho. Mueve lentamente hacia adelante y hacia atrás. Las modificaciones incluyen: Postura del gato con la frente tocando la rodilla, postura del gato con la pierna levantada, postura del gato con el brazo levantado, postura del gato con círculos en la caja torácica y postura del gato con los pies hacia un lado.`,
            benefits: `Estira la parte baja de la espalda. Fomenta la concentración. Descomprime la columna vertebral.`,
            modifications: `Frente hacia la rodilla. Levanta la pierna o el brazo.`,
            warnings: "",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ32pk6VvdbEzzWV5oaJx-42leELSVNwaiYyw&s",
            video: "https://youtu.be/vUiNcilaCC4?si=odFjPhEPGBCN7TuV&t=14",
        },

        {
            nameEs: "Postura de la cobra",
            nameSans: "Bhujangasana (भुजंगासन)",
            instructions: `Acuéstate boca abajo. Junta los pies con los dedos apuntando hacia atrás. Coloca las manos planas en el suelo, a los lados de las costillas. Levanta el pecho y mira hacia adelante.`,
            benefits: `Flexibiliza la columna vertebral. Fortalece las palmas de las manos, las muñecas y los dedos de los pies.`,
            modifications: `A) Cobra con una manta doblada debajo de las caderas. B) Cobra con una pierna levantada. C) Cobra con ambas piernas levantadas. D) Cobra con un brazo levantado al frente. E) Cobra con ambos brazos levantados al frente.`,
            warnings: "",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Bhujangasana_Yoga-Asana_Nina-Mel.jpg/500px-Bhujangasana_Yoga-Asana_Nina-Mel.jpg",
            video: "https://youtu.be/eYlf-WTZOKE?si=I96A-NDpQqC_Jow-&t=134",
        },

        {
            nameEs: "Postura del pez",
            nameSans: "Matsyasana (मत्स्यासन)",
            instructions: `Acuéstate sobre tu espalda. Coloca ambos brazos debajo de tu cuerpo, con las palmas hacia abajo y los codos lo más cerca posible de tu espalda. Inhala y levanta el pecho lo más alto que puedas. Doble los brazos y arquea la espalda. Mira hacia atrás, como si observaras a otros peces. Para volver a la posición humana, empuja con los codos, levanta la cabeza y bájala suavemente hacia el suelo.`,
            benefits: `Estiramiento profundo del pecho, el cuello y la columna vertebral. Ayuda a abrir las vías respiratorias, mejorando la capacidad pulmonar. También fortalece los músculos de la espalda y el core, al tiempo que alivia la tensión en los hombros y la parte superior de la espalda.`,
            modifications: `A) Uso de un cojín o bloque debajo de la espalda B) Mantener los codos en el suelo C) Postura del pez con cabeza en el suelo D) Usar un soporte para la cabeza`,
            warnings: "",
            image: "https://relajemos.com/wp-content/uploads/2017/05/matsyasana.png",
            video: "https://youtu.be/K8BTdHwUZXU?si=LijbApXaxzTTw7dR&t=13",
        },

        {
            nameEs: "Postura del triangulo",
            nameSans: "Trikonasana (उत्थित त्रिकोणासन)",
            instructions: `Da un paso atrás con la pierna izquierda, formando un ángulo recto con el pie derecho. El pie derecho debe estar alineado con el centro del pie izquierdo. Gira las caderas hacia el frente, asegurándote de que el muslo derecho quede mirando hacia adelante. Eleva los brazos a la altura de los hombros y baja los omóplatos. Extiende los brazos, alargando hacia los extremos. Extiende el torso sobre la pierna derecha y coloca la mano derecha en el suelo. Extiende el brazo izquierdo hacia arriba y mira hacia la mano izquierda. Repite del otro lado.`,
            benefits: `Abre el pecho. Calma el nervio ciático. Fortalece las piernas.`,
            modifications: `A) Triángulo parcial (mano sobre el muslo en lugar de la esterilla). B) Mano sobre un bloque. C) Mano sobre una silla. D) Lleva el brazo levantado sobre la oreja, paralelo al suelo.`,
            warnings: "",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Trikonasana_Yoga-Asana_Nina-Mel.jpg/250px-Trikonasana_Yoga-Asana_Nina-Mel.jpg",
            video: "https://youtu.be/5c4FYxuOVOg?si=2faZgYB5kppV6J3-&t=35",
        },

        {
            nameEs: "Postura del Marichi I",
            nameSans: "Marichyasana (मरीच्यासन)",
            instructions: `Siéntate con las piernas extendidas y eleva la pelvis con una manta doblada. Agarra el muslo izquierdo y lleva la rodilla hacia el pecho. Coloca el pie izquierdo plano en el suelo, alineando el talón con el hueso de la cadera. Extiende el brazo izquierdo hacia arriba y hacia el lado. Agarra el interior del pie derecho con la mano izquierda. Gira el tronco hacia la derecha, pasando el brazo izquierdo alrededor de la espinilla izquierda y el brazo derecho hacia atrás. Agarra la muñeca izquierda con la mano derecha. Baja las muñecas hacia el suelo y alza los costados del torso. Gira la cabeza para mirar la rodilla izquierda y alarga el torso sobre la pierna derecha. Mantén y cambia de lado.`,
            benefits: `Activa el core. Estira la columna vertebral, los hombros y las caderas.`,
            modifications: `Entrecruza los dedos detrás de la espalda.`,
            warnings: "",
            image: "https://cdn.yogajournal.com/wp-content/uploads/2007/08/Woman-Doing-Pose-Dedicated-to-the-Sage-Marichi-I-1.jpg",
            video: "https://www.youtube.com/watch?v=ZCQBIuBbQyE",
        },
        {
            nameEs: "Postura del Marichi II",
            nameSans: "Marichyasana (मरीच्यासन)",
            instructions: `Siéntate con las piernas extendidas (Staff). Lleva la rodilla derecha hacia el pecho, rota externamente el fémur y coloca la pierna derecha en Medio Loto. Dobla la pierna izquierda y coloca la planta del pie izquierdo sobre el suelo cerca de la ingle. Entrelaza los dedos alrededor de la espinilla izquierda y acerca la pierna hacia ti. Suelta las manos. Extiende el brazo y el hombro izquierdo hacia adelante, por el interior de la pierna izquierda, con la palma mirando hacia afuera y el pulgar apuntando hacia abajo. Inhala y dobla el brazo izquierdo, envolviéndolo alrededor del exterior de la pierna. Exhala y extiende el brazo derecho hacia atrás. Agarra los dedos, las manos o las muñecas. Al inhalar, alarga la columna vertebral. Exhala y flexiona hacia adelante, acercando el torso hacia la rodilla derecha. Cambia de lado.`,
            benefits: `Activa el core. Mejora la digestión. Estira la columna vertebral y los hombros.`,
            modifications: `Siéntate en el borde de una manta doblada.`,
            warnings: "",
            image: "https://beyogi.com/wp-content/uploads/2015/03/Marichis-Pose-2-Marichyasana-II.png",
            video: "https://youtu.be/trjsIA5PYd8?si=bGDcSSFZyVUOECB_&t=162",
        },
        {
            nameEs: "Rotación de cintura",
            nameSans: "Kati Chakrasana (कटि चक्रासन)",
            instructions: `Coloca los pies a la altura de los hombros. Inhala y eleva los brazos hasta la altura de los hombros. Exhala y gira el torso hacia la izquierda. Coloca la palma derecha sobre el hombro izquierdo y la mano izquierda detrás, sobre la cintura. Mira por encima del hombro izquierdo. Con cada exhalación, gira un poco más la columna vertebral. Repite del otro lado.`,
            benefits: `Mejora la postura. Tonifica los abdominales. Estimula el movimiento intestinal.`,
            modifications: `Usa un bloque debajo de las caderas para facilitar el giro. Realiza un giro parcial sin forzar la espalda. Ajusta las manos sobre el muslo o usa un cinturón para mayor comodidad. Apóyate en una silla para mayor estabilidad.`,
            warnings: "",
            image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSlzaVJup4GTPLUvG9gpAaN9dBWhNZpZKeeFAL5556Ux2VVpglIpNr2velp7dznJeZZNuFCglQg_8yv-E7YQAfeiQ",
            video: "https://www.youtube.com/shorts/QeYOkrpcHTM?feature=share",
        },

        {
            nameEs: "Postura del Lunge Torcido",
            nameSans: "Parivrtta Anjaneyasana (परिवर्त्त अञ्जनीआसन)",
            instructions: `Comienza en la postura de lunge con el pie derecho adelante y la pierna izquierda extendida hacia atrás. Coloca las manos en el suelo a cada lado del pie derecho y gira el torso hacia la derecha. Lleva el codo izquierdo hacia el muslo derecho y extiende el brazo derecho hacia el cielo, abriendo el pecho. Mantén la postura respirando profundamente y asegurándote de que las caderas estén alineadas. Para salir, regresa a la posición de lunge y repite del otro lado.`,
            benefits: `La columna vertebral se fortalece y se abre. Abre las caderas. Fortalece las piernas. Mejora el equilibrio. Calma el sistema nervioso.`,
            modifications: `Gira suavemente colocando una mano sobre la rodilla y la otra en la cadera para mantener el equilibrio.`,
            warnings: "",
            image: "https://i0.wp.com/yoganidra.com.mx/wp-content/uploads/2020/05/parivrrta-anjaneyasana-luna-creciente-giro-posturas-asanas-yoga-yoga-nidra-mx_1.jpg?fit=1499%2C834&ssl=1",
            video: "https://www.youtube.com/shorts/UHRpB4_7qR0?feature=share",
        },

        {
            nameEs: "Gesto del corazón",
            nameSans: "Apana Vayu Mudra (अपान वायु मुद्रा)",
            instructions: `Siéntate cómodamente con la espalda recta. En ambas manos, junta la punta del dedo medio y anular con la del pulgar. Dobla el dedo índice hacia la base del pulgar. El meñique permanece estirado. Mantén esta posición durante unos minutos.`,
            benefits: `Se considera útil para la salud del corazón. Alivia molestias en el pecho, calma palpitaciones y mejora la circulación.`,
            modifications: `Practícalo sentado, con respiración lenta. Si hay incomodidad en los dedos, relaja brevemente y vuelve a formar el mudra.`,
            warnings: "",
            image: "https://thumbs.dreamstime.com/b/gesto-apan-vayu-mudra-lifesaver-vector-188714128.jpg",
            video: "https://www.youtube.com/embed/uW33S26L2q8?start=9",
        },
        {
            nameEs: "Postura del barco",
            nameSans: "Navasana (नावासन)",
            instructions: `Siéntate en el suelo con las piernas estiradas. Inclina ligeramente el torso hacia atrás y levanta las piernas en ángulo. Estira los brazos hacia adelante a la altura de los hombros. Mantén el abdomen contraído y la espalda recta. Mantén durante unos  segundos.`,
            benefits: `Fortalece el abdomen, la espalda y los flexores de la cadera. Mejora el equilibrio y la concentración.`,
            modifications: `Si es muy desafiante, mantén las rodillas dobladas o apoya las manos en el suelo detrás de ti.`,
            warnings: "",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1eZfPocj-sOu-gqHQlA2rrb2almsFWxjvqQ&s",
            video: "https://www.youtube.com/embed/YX_f4tTcqcI?start=49",
        },
        {
            nameEs: "Gesto del estado meditativo",
            nameSans: "Bhairava Mudra (भैरव मुद्रा)",
            instructions: `Siéntate con la columna erguida en posición meditativa. Coloca la mano derecha sobre la izquierda, palmas hacia arriba, ambas descansando sobre el regazo. Cierra los ojos y respira de forma natural. Permanece asi unos minutos.`,
            benefits: `Promueve el equilibrio entre energías masculina y femenina. Facilita la introspección y la calma profunda. Se asocia con estados elevados de conciencia.`,
            modifications: `Si hay incomodidad en las piernas, siéntate sobre un cojín o silla. Puedes colocar un soporte bajo las manos si caen demasiado.`,
            warnings: "",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD1oDMncp1OToT2PIUpvdKPr3wsxgbzhamdA&s",
            video: "https://www.youtube.com/embed/YrijC7pG80g?start=184",
        },
        {
            nameEs: "Respiración de fuelle",
            nameSans: "Bhastrika Pranayama (भस्त्रिका प्राणायाम)",
            instructions: `Siéntate con la espalda recta y los brazos relajados.  
Inhala profundamente mientras elevas ambos brazos por encima de la cabeza.  
Exhala con fuerza por la nariz mientras bajas los brazos rápidamente al costado del cuerpo, con fuerza.  
Repite este ciclo de 10 a 20 veces de forma rítmica.  
Después, respira normalmente por unos segundos. Repite 2 a 3 rondas.
`,
            benefits: `Activa y oxigena el cuerpo rápidamente. Mejora la capacidad pulmonar y estimula la energía. Limpia los conductos nasales.`,
            modifications: `No recomendado para personas con presión alta o ansiedad. Comienza lentamente si eres principiante.`,
            warnings: "",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAUXnw428w2oaMxSDKrLUPyYG5odgFSthGew&s",
            video: "https://www.youtube.com/embed/FRETVhibMdU?start=6",
        },

        {
            nameEs: "Postura fácil o básica",
            nameSans: "Sukhasana सुखासन",
            instructions: `Siéntate con las piernas estiradas. Coloca las manos en el suelo a los lados de las caderas, con las palmas hacia abajo y los dedos apuntando hacia adelante. Cruza las piernas y baja las rodillas. Alarga la columna estirando hacia arriba. Descansa las palmas sobre las rodillas.`,
            benefits: `Mejora la flexibilidad en las caderas y la columna vertebral. Ayuda a mejorar la postura.`,
            modifications: `A) Coloca una almohada debajo de los glúteos. B) Apoya la espalda contra la pared. C) Junta las palmas en el centro del pecho. D) Flexiona hacia adelante un cuarto, medio o tres cuartos del camino. E) Entrelaza los dedos, extiende los brazos hacia arriba, estírate y luego flexiona hacia adelante.`,
            warnings: "",
            image: "https://cdn.yogajournal.com/wp-content/uploads/2021/11/Easy-Pose_Andrew-Clark_1.jpg?crop=535:301&width=1070&enable=upscale",
            video: "https://youtu.be/U67ESke7kYo?si=7kT3wgBjFUYPU8_E&t=15",
        },
        {
            nameEs: "Pose del niño extendido",
            nameSans: "Utthita Balasana (उत्तित बाळासन)",
            instructions: `Lleva las caderas hacia atrás y baja las nalgas hacia los talones, entrando en la postura del niño (Balasana). Estira los brazos hacia adelante, asegurándote de que los dedos de las manos estén bien extendidos y las palmas toquen el suelo. Relaja la frente en el suelo o en un cojín, manteniendo la columna alargada. Respira profundamente, permitiendo que tu cuerpo se relaje completamente en esta postura.`,
            benefits: `Estira los brazos, los hombros, la columna vertebral y las caderas.`,
            modifications: `A) Postura del niño con los brazos atrás. B) Postura del niño con los dedos entrelazados detrás de la espalda.`,
            warnings: "",
            image: "https://www.yoga2hear.co.uk/cdn/shop/articles/extended_child_3000x.jpg?v=1581296316",
            video: "https://youtu.be/ELZHntRpY5w?si=JJUAEgU6ikIF4uWw&t=66",
        },
        {
            nameEs: "Postura de la vaca",
            nameSans: "Bidalasana (बिडालासन)",
            instructions: `Comienza en las manos y las rodillas. Las rodillas deben estar debajo de las caderas y las muñecas alineadas con los hombros. Mantén la cabeza en una posición neutral, mirando al suelo.`,
            benefits: `Estira el torso y el cuello. Masajea la columna vertebral y el core.`,
            modifications: `Combinada con la postura del gato. Postura de la vaca con el brazo extendido.`,
            warnings: "",
            image: "https://www.sportlife.es/uploads/s1/12/86/78/20/postura-de-la-vaca_7_1200x690.jpeg",
            video: "https://www.youtube.com/watch?v=XV_UPVI2vuk",
        },
        {
            nameEs: "Extensión hacia el este",
            nameSans: "Purvottanasana (पूर्वोत्तानासन)",
            instructions: `Dobla las rodillas (pies planos sobre el suelo, separados a la altura de las caderas). Coloca las manos detrás de las caderas, con los dedos apuntando hacia afuera. Inclínate hacia atrás apoyándote en las manos. Levanta las caderas. Presiona con los pies, apretando los muslos y los glúteos. Activa el Mula Bandha. Empuja hacia abajo con las manos para levantar el pecho hacia arriba. Arquea ligeramente la espalda y deja caer la cabeza hacia atrás.`,
            benefits: `Abre la parte frontal del cuerpo. Fortalece los brazos, las piernas y el core.`,
            modifications: `A) Una pierna levantada. B) Piernas apoyadas en la pared. C) Bloque de yoga entre las piernas.`,
            warnings: "",
            image: "https://cdn.xuanlanyoga.com/wp-content/uploads/2019/10/Purvottanasana.jpg",
            video: "https://youtu.be/aWjm330Hfao?si=jTapp37KrB8hxfHw&t=267",
        },
        {
            nameEs: "Postura de la vela",
            nameSans: "Sarvangasana (सर्वाङ्गासन)",
            instructions: `Acuéstate de espaldas. Coloca una manta doblada debajo de los hombros. Levanta las piernas más allá de la cabeza, manteniendo la columna vertebral recta. Coloca los brazos contra la parte superior de la espalda, con las manos cerca de los omóplatos y los codos a la altura de los hombros. Empuja con las manos para elevar el torso. Levanta las piernas una a una. Coloca los brazos a los lados del cuerpo. Activa los abdominales. Baja vértebra por vértebra hacia el suelo.`,
            benefits: `Calma el cerebro. Alivia el estrés y la depresión leve. Estimula la tiroides, las glándulas prostáticas y los órganos abdominales. Estira los hombros y el cuello. Tonifica las piernas y los glúteos. Mejora la digestión. Ayuda a aliviar los síntomas de la menopausia. Reduce la fatiga. Alivia el insomnio.`,
            modifications: `Media parada de hombros. Arado.`,
            warnings: "",
            image: "https://i.mscwlns.co/media/misc/others/download_1737700917350_sarvangasanabenefits_i1p9kn.jpg",
            video: "https://youtu.be/o_xMEUNG0qY?si=Y9eQbP0pmMWGh9xB&t=17",
        },

    ];

    for (const p of posturas) {
        await prisma.posture.create({ data: p });
    }

    console.log("✅ Posturas insertadas correctamente.");
}

main()
    .catch((e) => {
        console.error("❌ Error al insertar posturas:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
//node prisma/seedPostura.js