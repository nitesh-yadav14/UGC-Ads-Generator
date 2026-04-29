import { UploadIcon, VideoIcon, ZapIcon } from 'lucide-react';

export const featuresData = [
    {
        icon: <UploadIcon className="w-6 h-6" />,
        title: 'Smart upload',
        desc: 'Drag & drop your assets. We auto-optomize format and size.'
    },
    {
        icon: <ZapIcon className="w-6 h-6" />,
        title: 'Instant Generation',
        desc: 'Optimized models deliver output in seconds with great fidelity.'
    },
    {
        icon: <VideoIcon className="w-6 h-6" />,
        title: 'Video Synthesis',
        desc: 'Bring product shots to life with short-form, social ready videos.'
    }
];

export const plansData = [
    {
        id: 'starter',
        name: 'Starter',
        price: '$10',
        desc: 'Try the platform at no cost.',
        credits: 25,
        features: [
            '25 Credits',
            'Standard Quality',
            'No WaterMark',
            'Slow Generation Speed',
            'Email support'
        ]
    },
    {
        id: 'pro',
        name: 'Pro',
        price: '$29',
        desc: 'Creator & Small team.',
        credits: 80,
        features: [
            '80 Credits',
            'HD Quality',
            'No WaterMark',
            'Video Generation',
            'Priority support'
        ],
        popular: true
    },
    {
        id: 'ultra',
        name: 'Ultra',
        price: '$99',
        desc: 'Scale across team and agencies.',
        credits: 300,
        features: [
            '300 Credits',
            'FHD Quality',
            'No WaterMark',
            'Fast Generation Speed',
            'Chat + Email support'
        ]
    }
];

export const faqData = [
    {
        question: 'How does the AI generation work?',
        answer: 'We leverage state-of-the-art diffusion models trained on millions of product images to blend your product into realistic scenes while preserving details, lighting and reflections.'
    },
    {
        question: 'Do I own the generated images?',
        answer: 'Yes — you receive full commercial rights to any images and videos generated on the platform. Use them for ads, ecommerce, social media and more.'
    },
    {
        question: 'Can I cancel anytime?',
        answer: 'Yes- you can cancel from the dasboard. You will retain access through the end of your billing period.'
    },
    {
        question: 'What input format do you support?',
        answer: 'We accept JPG, PNG and WEBP. Outputs are high-resolution PNG and MP4s optimized for social platforms.'
    }
];

export const footerLinks = [
    {
        title: "Quick Links",
        links: [
            { name: "Home", url: "#" },
            { name: "Features", url: "#" },
            { name: "Pricing", url: "#" },
            { name: "FAQ", url: "#" }
        ]
    },
    {
        title: "Legal",
        links: [
            { name: "Privacy Policy", url: "#" },
            { name: "Terms of Service", url: "#" }
        ]
    },
    {
        title: "Connect",
        links: [
            { name: "Instagram", url: "https://www.instagram.com/n.i.t.e.s.h_14?igsh=MW84MWpnMjQwYmJmdw%3D%3D&utm_source=qr" },
            { name: "LinkedIn", url: "https://www.linkedin.com/in/nitesh-yadav14/" },
            { name: "GitHub", url: "https://github.com/nitesh-yadav14" }
        ]
    }
];
