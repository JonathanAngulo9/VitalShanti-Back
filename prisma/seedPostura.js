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
        }

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