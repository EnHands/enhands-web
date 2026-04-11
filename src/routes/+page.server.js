// src/routes/+page.server.js

export async function load() {
    // 💡 FUTURE SUPABASE CALL:
    // const { data: people } = await supabase.from('members').select('*');
    
    // For now, we mock the data exactly as it looks in your old JSON file:
    let people = [
    {
        "name": "Johannes Frey",
        "img": "images/people/profile/Johannes.jpg",
        "img_hover": "images/people/fun/Johannes.jpg",
        "job": "Graduated M.Sc. Robotics, Cognition, Intelligence"
    },
    {
        "name": "Leon Kiesgen",
        "img": "images/people/profile/Leon.jpg",
        "img_hover": "images/people/fun/Leon.jpg",
        "job": "Graduated M.Sc. Robotics, Cognition, Intelligence"
    },
    {
        "name": "Silija Breimann, B.Sc.",
        "img": "images/people/profile/Silija.jpg",
        "img_hover": "images/people/fun/Silija.jpg",
        "job": "Studying M.Sc. Mechatronics & Robotics"
    },
    {
        "name": "Sonja Groß",
        "img": "images/people/profile/Sonja.jpg",
        "img_hover": "images/people/fun/Sonja.jpg",
        "job": "Ph.D. Candidate, MIRMI"
    },
    {
        "name": "Vincent Bürgin",
        "img": "images/people/profile/Vincent.jpg",
        "img_hover": "images/people/fun/Vincent.jpg",
        "job": "Graduated M.Sc. Informatics"
    },
    {
        "name": "Amartya Ganguly",
        "img": "images/people/profile/Amartya.jpg",
        "img_hover": "images/people/fun/Amartya.jpg",
        "job": "Postdoctoral Researcher, MIRMI"
    },
    {
        "name": "Julia Veloso de Oliveira",
        "img": "images/people/profile/Julia.jpg",
        "img_hover": "images/people/fun/Julia.jpg",
        "job": "Ph.D. Candidate, Experimental Audiology (Klinikum rechts der Isar)"
    },
    {
        "name": "Jana Koss",
        "img": "images/people/profile/Jana.jpg",
        "img_hover": "images/people/fun/Jana.jpg",
        "job": "Product Marketing Manager, d.velop AG"
    },
    {
        "name": "Eliyas Conford",
        "img": "images/people/profile/Eliyas.jpg",
        "img_hover": "images/people/fun/Eliyas.jpg",
        "job": "Studying B.Sc. Engineering Science"
    },
    {
        "name": "Paula Villa Fulton",
        "img": "images/people/profile/Paula.jpg",
        "img_hover": "images/people/fun/Paula.jpg",
        "job": "Ph.D. Candidate, Chair of Human Movement Science"
    },
    {
        "name": "Nikolas Carreira Kaarsberg",
        "img": "images/people/profile/Nikolas.jpg",
        "img_hover": "images/people/fun/Nikolas.jpg",
        "job": "Studying B.Sc. General Engineering (Technical University of Denmark)"
    },
    {
        "name":"Gabriel Castellano",
        "img": "images/people/profile/Gabriel.jpg",
        "job": "Graduated M.Sc. Neuroengineering"
    },
    {
        "name":"Mohamed Khaled Eyssa",
        "img": "images/people/profile/Mohamed.jpg",
        "img_hover": "images/people/fun/Mohamed.jpg",
        "job": "Studying M.Sc. Mechatronics, Robotics, and Biomechanical Engineering"
    },
    {
        "name":"Konrad Sautter",
        "img": "images/people/profile/Konrad.jpg",
        "img_hover": "images/people/fun/Konrad.jpg",
        "job": "Studying M.Sc. Robotics, Cognition, Intelligence"
    },
    {
        "name":"Katharina Welte",
        "img": "images/people/profile/Katharina.jpg",
        "img_hover": "images/people/fun/Katharina.jpg",
        "job": "Studying B.Sc. Engineering Science"
    },
    {
        "name":"Marcia Castillo",
        "img": "images/people/profile/Marcia.jpg",
        "img_hover": "images/people/fun/Marcia.jpg",
        "job": "Studying B.Sc. Mechanical Engineering"
    },
    {
        "name": "Leen Nael Zamamiri",
        "img": "images/people/profile/Leen.jpg",
        "img_hover": "images/people/fun/Leen.jpg",
        "job": "Studying B.Sc. Chemical Engineering"
    },
    {
        "name":"Anna Salacova",
        "img": "images/people/profile/Anna.jpg",
        "img_hover": "images/people/fun/Anna.jpg",
        "job": "Studying B.Sc. Chemical Engineering"
    },
    {
        "name": "Angela Agurto Zegarra",
        "img": "images/people/profile/Angela.jpg",
        "img_hover": "images/people/fun/Angela.jpg",
        "job": "Studying M.A. Science and Technology Studies"
    },
    {
        "name": "Claudia Hertling Mata",
        "img": "images/people/profile/Claudia.jpg",
        "img_hover": "images/people/fun/Claudia.jpg",
        "job": "Studying B.Sc. Engineering Science"
    },
    {
        "name": "Fatima Atabani",
        "img": "images/people/profile/Fatima.jpg",
        "img_hover": "images/people/fun/Fatima.jpg",
        "job": "Studying M.Sc. Development, Production and Management in Mechanical Engineering"
    },
    {
        "name": "Marc Avdeenco",
        "img": "images/people/profile/Marc.jpg",
        "img_hover": "images/people/fun/Marc.jpg",
        "job": "Studying M.Sc. Development, Production and Management in Mechanical Engineering"
    },
    {
        "name": "Selim Yaman Esgin",
        "img": "images/people/profile/Yaman.jpg",
        "img_hover": "images/people/fun/Yaman.jpg",
        "job": "Studying B.Sc. Mechanical Engineering"
    },
    {
        "name": "Elia Mohr",
        "img": "images/people/profile/Elia.jpg",
        "img_hover": "images/people/fun/Elia.jpg",
        "job": "Studying B.Sc. Mechanical Engineering"
    },
    {
        "name": "Tanouir Chihaoui",
        "img": "images/people/profile/Tanouir.jpg",
        "img_hover": "images/people/fun/Tanouir.jpg",
        "job": "Studying B.Sc. Engineering Science"
    },
    {
        "name": "Amal Ben Slimen",
        "img": "images/people/profile/Amal.jpg",
        "img_hover": "images/people/fun/Amal.jpg",
        "job": "Studying M.Sc. Robotics, Cognition, Intelligence"
    },
    {
        "name": "Mohammed Ben Slimen",
        "img": "images/people/profile/Mohammed.jpg",
        "img_hover": "images/people/fun/Mohammed.jpg",
        "job": "Studying B.Sc. Engineering Science"
    }
];

    // FUTURE SUPABASE CALL: const { data: supporters } = await supabase.from('partners').select('*');
    let supporters = [
    {
        "name": "Naya Qadam",
        "img": "images/logos/nayaqadam-small-2.png",
        "url": "https://nayaqadam.org/"
    },
    {
        "name": "MIRMI",
        "img": "images/logos/IRI_Zeichen_MIRMI_RGB_schwarz.png",
        "url": "https://www.mirmi.tum.de"
    },
    {
        "name": "TUM Venture Labs",
        "img": "images/logos/tum-venture-labs-logo.PNG",
        "url": "https://www.tum-venture-labs.de/labs/additive-manufacturing/"
    },
    {
        "name": "TU-Dresden",
        "img": "images/logos/tu-dresden-logo.png",
        "url": "https://tu-dresden.de"
    },
    {
        "name": "CeTI",
        "img": "images/logos/CeTI-logo.png",
        "url": "https://ceti.one/"
    },
    {
        "name": "Funding for Innovators",
        "img": "images/logos/funding-for-innovators-2.png",
        "url": "https://funding.unternehmertum.de/en"
    },
    {
        "name": "MakerSpace",
        "img": "images/logos/makerspace.png",
        "url": "https://maker-space.de/"
    },
    {
        "name": "Checkpoint System EDV GmbH",
        "img": "images/logos/Checkpoint.png",
        "url": "http://www.checkpoint-system.de/"
    },
    {
        "name": "Vodafone",
        "img": "images/logos/vodafone.png",
        "url": "https://www.vodafone.de/"
    }
];


    /**
     * Shuffles an array in place
     * @param {any[]} array
     */
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // We return the shuffled data to the frontend
    return {
        members: shuffleArray(people),
        partners: supporters
    };
}