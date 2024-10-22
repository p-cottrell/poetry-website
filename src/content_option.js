import hero from './assets/images/ellie_bw.jpg';
import coming_soon from './assets/images/coming-soon.png';
import speakeasy from './assets/images/speakeasy.png';

const logotext = "ELLIE COTTRELL";
const meta = {
    title: "Ellie Cottrell",
    description: "I'm Ellie",
};

const introdata = {
    title: "I’m Ellie Cottrell",
    animated: {
        first: "I'm a writer",
        second: "I'm a poet",
    },
    description: "Welcome! I write poetry and prose from the heart.\n\n My first poetry collection, Speakeasy, was released via In Case of Emergency Press in 2023. \n\n For more of my published works, check out my portfolio - and for news on my next poetry release, make sure to join my mailing list! \n\n Thanks for dropping by 🖤",
    your_img_url: hero,
};

const dataabout = {
    title: "abit about my self",
    aboutme: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis dolor id ligula semper elementum feugiat pretium nulla. \n\n Nunc non commodo dolor. Nunc mollis dignissim facilisis. Morbi ut magna ultricies.",
};


const dataportfolio = [{
        img: "https://www.writingwa.org/wp-content/uploads/2024/10/SWPtop8.png",
        title:"Stories With Pride",
        description: "There's Been Complaints",
        link: "https://medium.com/human-parts/two-dates-73a184e7b25a",
    },
    {
        img: "https://hooliganstreetpoetry.org/wp-content/uploads/2024/09/CF845694-1EDC-4DDA-AC99-052850C470AB.jpeg",
        title:"Hooligan Street Poetry",
        description: "The Bones Of This House Are Made Of Flowers",
        link: "https://hooliganstreetpoetry.org/the-bones-of-this-house-are-made-of-flowers/",
    },
    {
        img: "http://styluslit.com/wp-content/themes/adaption_custom/images/wax-tablet-dark.jpg",
        title:"StylusLit Issue 16",
        description: "Freak Storm in Mandjoogoordap",
        link: "http://styluslit.com/poetry/freak-storm-in-mandjoogoordap/",
    },
    {
        img: "https://picsum.photos/400/300/?grayscale",
        title:"Creatrix 66",
        description: "on hoping",
        link: "https://wapoets.com/creatrix-66-poetry/#Ellie",
    },
    {
        img: "https://i0.wp.com/wapoets.com/wp-content/uploads/2024/08/Poetry-dAmour-new-cover.jpg?resize=683%2C1024&ssl=1",
        title:"Poetry d'Amour 2024",
        description: "Noah From The Notebook",
        link: "https://wapoets.com/wa-poets-publishing-2/poetry-damour-anthology/",
    },
    {
        img: "https://www.nightparrotpress.com/wp-content/uploads/2024/04/OURSELVES_COVER-social-media-600x928.jpg",
        title:"Ourselves: 100 Micro Memoirs",
        description: "My Sister, the Mythical Creature",
        link: "https://www.nightparrotpress.com/product/ourselves-100-micro-memoirs/",
    },

    {
        img: "https://picsum.photos/400/?grayscale",
        title:"Creatrix 63",
        description: "the grief in living",
        link: "https://wapoets.com/creatrix-63-poetry/#EllieC",
    },
    {
        img: "https://i0.wp.com/wapoets.com/wp-content/uploads/2023/08/2023PdAm-Cover-Perfect.jpg?resize=678%2C1024&ssl=1",
        title:"Poetry d'Amour 2023",
        description: "Could Numbers Ever Know",
        link: "https://wapoets.com/wa-poets-publishing-2/poetry-damour-anthology/",
    },

];


const databooks = [{
    img: speakeasy,
    title: "Speakeasy",
    description: "Speakeasy is the first collection of Perth poet, Ellie Cottrell. It is a sparkling work, presented in two parts: Conceal and Reveal.\n\n'Conceal' groups poems of self-doubt, of longing, of regret.\n\n'Reveal' answers those poems in a celebration of love, lust, and the joy of life shared and explored.\n\nAlthough these poems are engagingly joyful and immediately appealing, they repay careful reading and re-reading. This short collection announces a wonderfully skilled new poet.",
    purchase_link: "https://checkout.square.site/buy/BHXLTEWF4CXUPACVLG6BVVJC",
},
{
    img: coming_soon,
    title: "Poetry Sham",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vehicula eu nunc et sollicitudin. Cras pulvinar, nisi at imperdiet pharetra. ",
    purchase_link: "/purchase/book1",
},
];


const contactConfig = {
    YOUR_EMAIL: "elliecottrellwrites@gmail.com",
    description: "Drop me a line and I'll drop you two...",
    // creat an emailjs.com account
    // check out this tutorial https://www.emailjs.com/docs/examples/reactjs/
    YOUR_SERVICE_ID: "service_id",
    YOUR_TEMPLATE_ID: "template_id",
    YOUR_USER_ID: "user_id",
};

const socialprofils = {
    medium: "https://medium.com/@elliecott22",
    instagram: "https://instagram.com/elliecottrellwrites",
    linkedin: "https://www.linkedin.com/in/ellie-cottrell-22ab5a115/",

};
export {
    meta,
    dataabout,
    dataportfolio,
    databooks,
    introdata,
    contactConfig,
    socialprofils,
    logotext,
};