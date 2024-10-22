import hero from './assets/images/ellie.jpg';
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
    description: " I write prose and poetry from the heart. Creative non-fiction is my favourite.",
    your_img_url: hero,
};

const dataabout = {
    title: "abit about my self",
    aboutme: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis dolor id ligula semper elementum feugiat pretium nulla. Nunc non commodo dolor. Nunc mollis dignissim facilisis. Morbi ut magna ultricies.",
};


const dataportfolio = [{
        img: "https://www.writingwa.org/wp-content/uploads/2024/10/SWPtop8.png",
        description: "Two Dates",
        link: "https://medium.com/human-parts/two-dates-73a184e7b25a",
    },
    {
        img: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*XYOTvDi2i05nn4Go9wuqEw@2x.jpeg",
        description: "Meals That Make a Life",
        link: "https://medium.com/the-narrative-arc/meals-that-make-a-life-d649e7addff2",
    },
    {
        img: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*n2CXbu4aQ5KF2E6I5wIXqg.jpeg",
        description: "Del Was in My Life for a Season",
        link: "https://medium.com/the-narrative-arc/del-was-in-my-life-for-a-season-16d05a52eb16",
    },
    {
        img: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*XJMzJLloqFmLaGKYbzjoPg.jpeg",
        description: "The Gatekeeper",
        link: "https://medium.com/the-narrative-arc/the-gatekeeper-e90474c53b48",
    },
    {
        img: "https://miro.medium.com/v2/resize:fit:720/format:webp/0*bfOxW7wsVq5zyPw5",
        description: "Mandatory Jelly Snakes",
        link: "#https://medium.com/runners-life/mandatory-jelly-snakes-6f8c44dcb575",
    },
    {
        img: "https://miro.medium.com/v2/resize:fit:720/format:webp/0*DbGDGb-WPwWLscoF",
        description: "The Daughter I’ll Never Have",
        link: "https://medium.com/imogenes-notebook/the-daughter-ill-never-have-63f5a3746cd6",
    },

    {
        img: "https://miro.medium.com/v2/resize:fit:720/format:webp/0*YxTe1afdUWgY2JAx",
        description: "Tails from the Fetish Scene",
        link: "https://medium.com/beloved/tails-from-the-fetish-scene-2572e94d97e6",
    },
    {
        img: "https://picsum.photos/400/300/?grayscale",
        description: "The wisdom of life consists in the elimination of non-essentials.",
        link: "#",
    },
    {
        img: "https://picsum.photos/400/?grayscale",
        description: "The wisdom of life consists in the elimination of non-essentials.",
        link: "#",
    },
    {
        img: "https://picsum.photos/400/550/?grayscale",
        description: "The wisdom of life consists in the elimination of non-essentials.",
        link: "#",
    },
    {
        img: "https://picsum.photos/400/?grayscale",
        description: "The wisdom of life consists in the elimination of non-essentials.",
        link: "#",
    },
    {
        img: "https://picsum.photos/400/700/?grayscale",
        description: "The wisdom of life consists in the elimination of non-essentials.",
        link: "#",
    },
];


const databooks = [{
    img: speakeasy,
    title: "Speakeasy",
    description: "Speakeasy is the first collection of Perth poet, Ellie Cottrell. It is a sparkling work, presented in two parts: Conceal and Reveal. 'Conceal' groups poems of self-doubt, of longing, of regret. 'Reveal' answers those poems in a celebration of love, lust, and the joy of life shared and explored. Although these poems are engagingly joyful and immediately appealing, they repay careful reading and re-reading. This short collection announces a wonderfully skilled new poet.",
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
    YOUR_PHONE: "blank",
    description: "Contact me below for writing commissions, gossip, or just to say hello",
    // creat an emailjs.com account
    // check out this tutorial https://www.emailjs.com/docs/examples/reactjs/
    YOUR_SERVICE_ID: "service_id",
    YOUR_TEMPLATE_ID: "template_id",
    YOUR_USER_ID: "user_id",
};

const socialprofils = {
    github: "https://github.com",
    facebook: "https://facebook.com",
    linkedin: "https://linkedin.com",

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