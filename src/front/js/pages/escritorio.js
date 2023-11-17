import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";
import "../../styles/escritorio.css";
import atom from "../../img/atom.png";
import list from "../../img/list.png";
import mountain from "../../img/Mountain1.jpg";
import books from "../../img/books.png";

export const Escritorio = () => {

    const { store, actions } = useContext(Context);

    /* Filtro que se aplica para mostrar sólo los diarios que corresponden al usuario*/
    const filteredJournals = store.journals.filter((journal) => journal.author.id === store.profile.id);
    const filteredLists = store.lists.filter((list) => list.author.id === store.profile.id);
    const habitsToday = store.habits.filter((habit) => habit.author.id === store.profile.id && new Date(habit.date).toLocaleDateString('es-VE', { timeZone: "UTC" }) === new Date().toLocaleDateString() && habit.completed === false)
    const filteredEmotions = store.emotions.filter((emotion) => emotion.author.id === store.profile.id);

    const frases = [
        { frase: "El único modo de hacer un gran trabajo es amar lo que haces ", autor: "Steve Jobs" },
        { frase: "Nunca pienso en las consecuencias de fallar un gran tiro… cuando se piensa en las consecuencias se está pensando en un resultado negativo ", autor: "Michael Jordan" },
        { frase: "El dinero no es la clave del éxito; la libertad para poder crear lo es ", autor: "Nelson Mandela" },
        { frase: "Cuanto más duramente trabajo, más suerte tengo ", autor: "Gary Player" },
        { frase: "La inteligencia consiste no sólo en el conocimiento, sino también en la destreza de aplicar los conocimientos en la práctica ", autor: "Aristóteles" },
        { frase: "El trabajo duro hace que desaparezcan las arrugas de la mente y el espíritu ", autor: "Helena Rubinstein" },
        { frase: "Cuando algo es lo suficientemente importante, lo haces incluso si las probabilidades de que salga bien no te acompañan ", autor: "Elon Musk" },
        { frase: "Escoge un trabajo que te guste, y nunca tendrás que trabajar ni un solo día de tu vida ", autor: "Confucio" },
        { frase: "Un sueño no se hace realidad por arte de magia, necesita sudor, determinación y trabajo duro ", autor: "Colin Powell" },
        { frase: "Cuéntamelo y me olvidaré. Enséñamelo y lo recordaré. Involúcrame y lo aprenderé ", autor: "Benjamin Franklin" },
        { frase: "La lógica te llevará de la a a la z. la imaginación te llevará a cualquier lugar ", autor: "Albert Einstein" },
        { frase: "A veces la adversidad es lo que necesitas encarar para ser exitoso ", autor: "Zig Ziglar" },
        { frase: "Para tener éxito tu deseo de alcanzarlo debe ser mayor que tu miedo al fracaso ", autor: "Bill Cosby" },
        { frase: "Cuando pierdas, no pierdas la lección ", autor: "Dalai Lama" },
        { frase: "No busques los errores, busca un remedio ", autor: "Henry Ford" },
        { frase: "La vida es una aventura, atrévete ", autor: "Teresa de Calcuta" },
        { frase: "Tu actitud, no tu aptitud, determinará tu altitud ", autor: "Zig Ziglar" },
        { frase: "Tienes que hacer las cosas que crees que no puedes hacer ", autor: "Eleanor Roosevelt" },
        { frase: "Si te caíste ayer, levántate hoy ", autor: "H. G. Wells" },
        { frase: "Siempre parece imposible... hasta que se hace ", autor: "Nelson Mandela" },
        { frase: "Si no pierdes, no puedes disfrutar de las victorias ", autor: "Rafael Nadal" },
        { frase: "No dejes que el miedo se interponga en tu camino ", autor: "Babe Ruth" },
        { frase: "Haz de cada día tu obra maestra ", autor: "John Wooden" },
        { frase: "No cuentes los días, haz que los días cuenten ", autor: "Muhammad Ali" },
        { frase: "El mejor momento del día es ahora ", autor: "Pierre Bonnard" },
        { frase: "Si la oportunidad no llama, construye una puerta ", autor: "Milton Berle" },
        { frase: "Deja que cada hombre ejerza el arte que domina ", autor: "Aristófanes" },
        { frase: "El valor de una idea radica en su uso ", autor: "Thomas Edison" },
        { frase: "Piensa, sueña, cree y atrévete ", autor: "Walt Disney" },
        { frase: "Los obstáculos son esas cosas atemorizantes que ves cuando apartas los ojos de tu meta ", autor: "Henry Ford" },
        { frase: "Asegúrate de que colocas tus pies en el lugar correcto, y luego mantente firme ", autor: "Abraham Lincoln" },
        { frase: "Las ideas pueden cambiar la vida. A veces a lo único que tienes que abrir la puerta es a una buena idea ", autor: "Jim Rohn" },
        { frase: "La mejor manera para empezar es callándote y empezar a hacer ", autor: "Walt Disney" },
        { frase: "Nadie se desembaraza de un hábito o de un vicio tirándolo de una vez por la ventana; hay que sacarlo por la escalera, peldaño a peldaño ", autor: "Mark Twain" },
        { frase: "Si te caes siete veces, levántate ocho ", autor: "Proverbio chino" },
        { frase: "La perfección no es alcanzable, pero si perseguimos la perfección podemos conseguir la excelencia ", autor: "Vince Lombardi" },
        { frase: "Tienes que esperar cosas de ti mismo antes de poder hacerlas ", autor: "Michael Jordan" },
        { frase: "Transforma tus heridas en sabiduría ", autor: "Oprah Winfrey" },
        { frase: "Solo aquellos que se arriesgan a ir demasiado lejos pueden descubrir lo lejos que pueden llegar ", autor: "T.S. Eliot" },
        { frase: "Del sufrimiento emergieron las almas más fuertes, los caracteres sólidos tienen cicatrices ", autor: "Khalil Gibran" },
        { frase: "El universo no conspira contra ti, pero tampoco se desvía para alinear tu camino ", autor: "Tim Ferriss" },
        { frase: "Con autodisciplina casi todo es posible ", autor: "Theodore Roosevelt" },
        { frase: "La innovación distingue al líder del seguidor", autor: "Steve Jobs" },
        { frase: "Si puedes soñarlo, puedes hacerlo", autor: "Walt Disney" },
        { frase: "El secreto para salir adelante es comenzar", autor: "Mark Twain" },
        { frase: "Los obstáculos son esas cosas atemorizantes que ves cuando apartas los ojos de tu meta", autor: "Henry Ford" },
        { frase: "La vida es como montar en bicicleta. para mantener el equilibrio tienes que avanzar", autor: "Albert Einstein" },
        { frase: "El éxito no es definitivo, el fracaso no es fatídico. Lo que cuenta es el valor para continuar", autor: "Winston Churchill" },
        { frase: "Sé valiente. Toma riesgos. Nada puede sustituir la experiencia ", autor: "Paulo Coelho" },
        { frase: "El futuro pertenece a aquellos que creen en la belleza de sus sueños", autor: "Eleanor Roosevelt" },
        { frase: "El conocimiento es poder ", autor: "Francis Bacon" },
        { frase: "He aprendido que el valor no es la ausencia de miedo, sino el triunfo sobre él. El hombre valiente no es el que no siente miedo, sino el que lo domina ", autor: "Nelson Mandela" },
        { frase: "Solo puede ser feliz siempre el que sabe ser feliz con todo", autor: "Confucio" },
        { frase: "Es la capacidad de resistir a los errores lo que a menudo conduce a un mayor éxito", autor: "J. K. Rwolling" },
        { frase: "Aferrarse al rencor es como beber veneno y esperar que otra persona muera", autor: "Buda" },
        { frase: "No pares cuando estés cansado. Para cuando hayas terminado", autor: "Marilyn Monroe‍" },
        { frase: "El 80% del éxito se basa simplemente en insistir", autor: "Woody Allen" },
        { frase: "Cree que puedes y casi lo habrás logrado", autor: "Theodore Roosevelt" },
        { frase: "No importa lo que te diga la gente, las palabras y las ideas pueden cambiar el mundo", autor: "Robin Williams" },
        { frase: "Si tienes un sueño y crees en él, corres el riesgo de que se convierta en realidad ", autor: "Walt Disney" },
        { frase: "Nunca se es demasiado viejo para fijar otra meta o para soñar un nuevo sueño", autor: "C. S. Lewis" },
        { frase: "Lo que no te mata, te hace más fuerte", autor: "Friedrich Nietzsche" },
        { frase: "El hombre que mueve montañas comienza cargando pequeñas piedras", autor: "Confucio" },
        { frase: "Buenos amigos, buenos libros y una conciencia tranquila: esa es la vida ideal ", autor: "Mark Twain" },
        { frase: "Un optimista ve una oportunidad en toda calamidad, un pesimista ve una calamidad en toda oportunidad", autor: "Winston Churchill" },
        { frase: "Solo aquellos que se arriesgan a caer pueden conseguir grandes cosas", autor: "Robert F. Kennedy" },
        { frase: "El éxito es la suma de pequeños esfuerzos, que se repiten día tras día ", autor: "Robert Collier" },
        { frase: "Sal de tu zona de confort. Solo puedes crecer si estás dispuesto a sentirte raro e incómodo cuando intentas algo nuevo ", autor: "Brian Tracy" },
        { frase: "¿Por qué contentarnos con vivir a rastras cuando sentimos el anhelo de volar? ", autor: "Hellen Keller" },
        { frase: "Entrega siempre más de lo que esperan de ti", autor: "Larry Page" },
        { frase: "Aprovecha las oportunidades que aparezcan, donde quiera que estén ", autor: "Lakshmi Mittal" },
        { frase: "Nunca es demasiado tarde para ser lo que podrías haber sido", autor: "George Eliot" },
        { frase: "Puedo aceptar el fracaso pero no puedo aceptar no intentarlo", autor: "Michael Jordan" },
        { frase: "La mejor forma de predecir el futuro es creándolo", autor: "Abraham Lincoln" },
        { frase: "Un día despertarás y descubrirás que no tienes más tiempo para hacer lo que soñabas. El momento es ahora. Actúa ", autor: "Paulo Coelho" },
        { frase: "Hoy eres un lector y mañana serás un líder", autor: "Margaret Fuller" },
        { frase: "Los dos guerreros más poderosos son la paciencia y el tiempo ", autor: "León Tolstói" },
        { frase: "No puedes derrotar a la persona que nunca se rinde", autor: "Babe Ruth" },
        { frase: "El secreto de tu éxito está determinado por tu agenda diaria ", autor: "John C. Maxwell" },
        { frase: "Recordar que vas a morir, es la mejor manera que conozco para no pensar que tienes algo que perder. Ya estás desnudo. No hay ninguna razón para no seguir a tu corazón ", autor: "Steve Jobs" },
        { frase: "Se lo suficientemente valiente para vivir de forma creativa. El lugar creativo donde nadie ha estado ", autor: "Alan Alda" },
        { frase: "Cuando dejo ir lo que soy, me convierto en lo que debería ser ", autor: "Lao Tzu" },
        { frase: "Apunta a la luna. Si fallas, podrías dar a una estrella", autor: "William Clement Stone" },
        { frase: "Existe al menos un rincón del universo que con toda seguridad puedes mejorar, y eres tú mismo ", autor: "Aldous Huxley" },
        { frase: "El verdadero buscador crece y aprende, y descubre que siempre es el principal responsable de lo que sucede ", autor: "Jorge Bucay" },
        { frase: "Escribir es un oficio que se aprende escribiendo ", autor: "Simone de Beauvoir" },
        { frase: "La forma más rápida de cambiar es convivir con personas que ya son como quieres ser ", autor: "Reid Hoffman" },
        { frase: "La felicidad no es algo que pospones para el futuro; es algo que diseñas para el presente", autor: "Jim Rohn" },
        { frase: "La alegría es contagiosa y siempre consigue descubrir una solución donde la lógica sólo encontró una explicación para el error", autor: "Paulo Coelho" },
        { frase: "Vive la vida que amas. Ama la vida que vives ", autor: "Bob Marley" },
        { frase: "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito ", autor: "Albert Schweitzer" },
        { frase: "Unas palabras amables, un libro cálido y una sonrisa honesta pueden hacer milagros ", autor: "William Hazlitt" },
        { frase: "La verdadera felicidad consiste en hacer el bien", autor: "Aristóteles" },
        { frase: "El otoño se convierte en una nueva primavera cuando cada hoja es una flor ", autor: "Albert Camus" },
        { frase: "El éxito es encontrar satisfacción en dar un poco más de lo que se recibe", autor: "Christopher Reeve" },
        { frase: "La alegría reside en la alegría del logro y en la emoción del esfuerzo creativo ", autor: "Franklin Roosevelt" },
        { frase: "La verdadera motivación procede de trabajar en cosas que nos importan", autor: "Sheryl Sandberg" },
        { frase: "La felicidad no ocurre por casualidad, sino por elección", autor: "Jim Rohn" },
        { frase: "No tienes poder sobre los acontecimientos exteriores, pero sí sobre tu mente. Aprende esto, y encontrarás tu fuerza ", autor: "Marco Aurelio" },
        { frase: "La buena vida es una forma de pensar", autor: "Emilio Valcárcel" },
        { frase: "Puedes ser feliz allí donde estés ", autor: "Joel Osteen" },
        { frase: "El término «felicidad» perdería todo su significado si no fuese compensado por la tristeza", autor: "Carl Jung" },
        { frase: "Alguien se sienta en la sombra porque alguien plantó un árbol hace mucho tiempo ", autor: "Warren Buffett" },
        { frase: "Avanza con confianza en la dirección de tus sueños", autor: "Thoreau" },
        { frase: "La diligencia es la madre de la buena suerte", autor: "Benjamin Franklin" },
        { frase: "Sólo se vive una vez. Pero si lo haces bien, una vez basta", autor: "Mae West" },
        { frase: "Da el primer paso con fe. No tienes que ver todas las escaleras, sólo da el primer paso", autor: "Martin Luther King" },
        { frase: "Trabajar duro por algo que no te importa se llama estrés. Trabajar duro por algo que te importa de verdad se llama pasión", autor: "Simon Sinek" },
        { frase: "El éxito depende del esfuerzo", autor: "Sófocles" },
        { frase: "Intenta y falla, pero nunca falles en intentarlo", autor: "Jared Leto" },
        { frase: "No quiero ganarme la vida, quiero vivir", autor: "Oscar Wilde" },
        { frase: "La vida no es un problema a ser resuelto, sino una realidad a experimentar", autor: "Søren Aabye Kierkegaard" },
        { frase: "Háblate a ti mismo como harías con alguien a quien amas ", autor: "Brene Brown" },
        { frase: "Por más difícil que parezca la vida, siempre hay algo que puedes hacer y en lo que puedes tener éxito", autor: "Stephen Hawking" },
        { frase: "El fracaso se convierte en éxito si aprendes de él", autor: "Malcolm Forbes" },
        { frase: "La mala noticia es que el tiempo vuela. La buena noticia es que tú eres el piloto ", autor: "Michael Altshuler" },
        { frase: "La única manera de encontrar los límites de lo posible es ir más allá de lo imposible", autor: "Arthur C. Clarke" },
        { frase: "Casi todas las cosas buenas que suceden en el mundo, nacen de una actitud de aprecio por los demás", autor: "Dalai Lama" },
        { frase: "Donde reina el amor, siempre sobran las leyes", autor: "Platón" },
        { frase: "Amarse a uno mismo es el comienzo de una larga vida romántica", autor: "Oscar Wilde" },
        { frase: "Nada de lo que vistes es más importante que tu sonrisa ", autor: "Connie Stevens" },
        { frase: "En cada forma de vida existe el deseo del amor ", autor: "D. H. Lawrence" },
        { frase: "Todos nos necesitamos los unos a los otros", autor: "Leo Buscaglia" },
        { frase: "Antes moriría de pasión que de aburrimiento ", autor: "Vincent van Gogh" },
        { frase: "Solo hay una felicidad en la vida, amar y ser amado", autor: "George Sand" },
        { frase: "El amor propio es la fuente de todos los tipos de amor ", autor: "Pierre Corneille" },
        { frase: "Cambias tu vida al cambiar tu corazón", autor: "Max Lucado" },
        { frase: "La sencillez es una forma de humildad y la sencillez es una señal de la verdadera grandeza ", autor: "Vince Lombardi" },
        { frase: "El alma que hablar puede con los ojos, también puede besar con la mirada ", autor: "Gustavo Adolfo Bécquer" },
        { frase: "El que ama, se hace humilde. Aquellos que aman, por decirlo de alguna manera, renuncian a una parte de su narcisismo ", autor: "Sigmund Freud" },
        { frase: "Sólo porque alguien no te ame como tú quieres, no significa que no te ame con todo su ser ", autor: "Gabriel García Márquez" },
        { frase: "El amor no mira con los ojos, sino con el alma", autor: "William Shakespeare" },
        { frase: "La mejor forma de olvidar las malas cosas de la vida es aprender a recordar las cosas buenas", autor: "Mark Amend" },
        { frase: "Árbol de la esperanza, mantente firme", autor: "Frida Kahlo" },
        { frase: "El éxito es la capacidad de ir de fracaso en fracaso sin perder el entusiasmo", autor: "Winston Churchill" },
        { frase: "Tus acciones positivas combinadas con los pensamientos positivos generan éxitos", autor: "Shiv Khera" },
        { frase: "Qué maravilloso es que nadie tenga que esperar ni un segundo para empezar a mejorar el mundo", autor: "Ana Frank" },
        { frase: "Un solo rayo de sol es suficiente para apartar muchas sombras ", autor: "San Francisco de Asís" },
        { frase: "Cuando piensas en positivo, cosas buenas ocurren ", autor: "Matt Kemp" },
        { frase: "No podemos ayudar a todos, pero todo el mundo puede ayudar a alguien ", autor: "Ronald Reagan" },
        { frase: "Sé el cambio que quieres ver en el mundo", autor: "Mahatma Gandhi" },
        { frase: "Cualquier cosa que la mente del hombre puede concebir y creer, puede ser conseguida", autor: "Napoleon Hill" },
        { frase: "Si supiera que el mundo se acaba mañana, yo, hoy todavía, plantaría un árbol", autor: "Martin Luther King" },
        { frase: "Es impresionante. La vida cambia muy rápido, de un modo positivo, si la dejas", autor: "Lindsey Vonn" },
        { frase: "La palabra «no» solo significa que empieces otra vez en un nivel superior", autor: "Peter Diamandis" },
        { frase: "La grandeza nace de pequeños comienzos", autor: "Sir Francis Drake" },
        { frase: "Pon tu corazón, mente y alma incluso en los actos más pequeños. Ese es el secreto del éxito", autor: "Swami Sivananda" },
        { frase: "La palabra «no» solo significa que empieces otra vez en un nivel superior", autor: "Peter Diamandis" },
        { frase: "La grandeza nace de pequeños comienzos", autor: "Sir Francis Drake" },
        { frase: "Pon tu corazón, mente y alma incluso en los actos más pequeños. Ese es el secreto del éxito", autor: "Swami Sivananda" }]

    function getRandomElement(frases) {
        // Obtenemos un número aleatorio entre 0 y la longitud de la lista
        const index = Math.floor(Math.random() * frases.length);

        // Devolvemos el elemento en la posición index
        return (<div className="quoteElement">
            <h3>{frases[index].frase}.</h3>
            <h5>{frases[index].autor}</h5>
        </div>)
    }

    return (
        <div className="dashboard">
            <div className="dashboardContainerbox">

                {/* Encabezado del escritorio principal del usuario */}
                <h4><i className="fa-solid fa-house"></i> Escritorio</h4>
                <div className="desktopHeader">
                    <h1>Bienvenid@ {store.profile ? store.profile.name : ""}</h1>
                    <h5>¿Qué deseas hacer hoy?</h5>
                </div>

                <div className="mainImg" style={{ backgroundImage: `url(${mountain})`}}>
                    {getRandomElement(frases)}
                </div>

                {/* Se muestran las cards principales del escritorio (enlaces a las herramientas) */}
                <div className="desktopSecondHeader">
                    <div className="desktopCard me-2">
                        <div id="leftDesktopCard">
                            <img src={atom} className="desktopCardImg" />
                        </div>
                        <div id="rightDesktopCard">
                            <h4 className="desktopCardTitle">Hábitos</h4>
                            <p className="desktopCardText"> Incorpora hábitos positivos a tu vida y hazles seguimiento. </p>
                            {habitsToday.length == 0 ? <p>No tienes tareas pendientes para hoy.</p> : <p>Tienes {habitsToday.length} {habitsToday.length == 1 ? "tarea programada para hoy." : "tareas programadas para hoy."}</p>}
                        </div>
                    </div>
                    <div className="desktopCard me-2">
                        <div id="leftDesktopCard">
                            <img src={books} className="desktopCardImg" />
                        </div>
                        <div id="rightDesktopCard">
                            <h4 className="desktopCardTitle">Diarios</h4>
                            <p className="desktopCardText"> Llevar un diario siempre es una buena práctica para tu día a día. </p>
                            {filteredJournals.length == 0 ? <p>No tienes ningún diario.</p> : <p>Tienes {filteredJournals.length} {filteredJournals.length == 1 ? "diario creado." : "diarios creados."}</p>}
                        </div>
                    </div>
                    <div className="desktopCard me-2">
                        <div id="leftDesktopCard">
                            <img src={list} className="desktopCardImg" />
                        </div>
                        <div id="rightDesktopCard">
                            <h4 className="desktopCardTitle">Listas</h4>
                            <p className="desktopCardText"> ¡Que no se te olvide nada! Lleva listas de tus tareas pendientes. </p>
                            {filteredLists.length == 0 ? <p>No tienes ninguna lista creada.</p> : <p>Tienes {filteredLists.length} {filteredLists.length == 1 ? "lista creada." : "listas creadas."}</p>}
                        </div>
                    </div>
                    <div className="desktopCard">
                        <div id="leftDesktopCard">
                            <img src={atom} className="desktopCardImg" />
                        </div>
                        <div id="rightDesktopCard">
                            <h4 className="desktopCardTitle">Ánimo</h4>
                            <p className="desktopCardText"> Haz seguimiento a tu estado de ánimo y ve midiendo tu evolución. </p>
                            {filteredEmotions.length == 0 ? <p>No tienes registros de estados de ánimo.</p> : <p>Tienes {filteredEmotions.length} {filteredEmotions.length == 1 ? "registro de estado de ánimo." : "registros de estado de estados de ánimo."}</p>}
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
};