//teacher profiles
import shunsuke from '../images/staff/shunsuke.jpg'
import vincent from '../images/staff/vincent.jpg'
import radka from '../images/staff/radka.jpg'
import cedric from '../images/staff/cedric.jpg'
import matt from '../images/staff/matt.jpg'
import liza from '../images/staff/liza.jpg'
import mimmi from '../images/staff/mimmi.jpg'
import bre from '../images/staff/bre.jpg'
import momo from '../images/staff/momo.jpg'
import futaba from '../images/staff/futaba.jpg'
import sonja from '../images/staff/sonja.jpg'
export const PROFILES = {
        _62fb3ed3bc7766179393b277:{image:vincent,name:'Vincent',active:true},
        _63882dbd8a0031a501d54140:{image:radka,name:'Radka',active:false},
        _63e718f7ccf275b1babaa770:{image:cedric,name:'Cedric',active:false},
        _63218b02f1user7f3f46bf91af22:{image:bre,name:'Bre',active:false},
        _628c7aefc378ce2a01df6ac7:{image:matt,name:'Matt',active:true},
        _628f3e7b8981f84051396159:{image:shunsuke,name:'Shunsuke',active:false},
        _640d4ff6470b0e234739c640:{image:liza,name:'Liza',active:false},
        _64327746ee94db5a26b715c0:{image:mimmi,name:'Mimmi',active:false},
        _6432522fee94db5a26b6291b:{image:momo,name:'Momo',active:false},
        _641129d948fed7fcee0cf312:{image:futaba,name:'Futaba',active:false},
        _62900e59f7fadacf7159f379:{image:sonja,name:'Sonja',active:false},
        _645ccb04a971b39b6c46a843:{image:'',name:'Nick',active:true},
        _648969d9e113c60e1c124349:{image:'',name:'Michael',active:true},
        _64fc33573b8fe1dba5c803f7:{image:'',name:'Karina',active:true},
        _64e19896083ada28b408a51f:{image:'',name:'Solange',active:true},
        
};

export const FLUENCY = {
        _1:{level:'Proficient',
            en_speaking:'Can articulate complex ideas extensively, across any topic, using sophisticated grammar, natural expressions, and nuance, on par with a native speaker, with clear pronunciation',
            en_listening:'Can understand complex ideas that are conveyed using sophisticated grammar, natural expressions, and nuance, regardless of the medium of delivery, accents, or familiarty with the topic',
            en_unlock:'media',
            jp_speaking:'全てのトピックにおいて複雑なアイデアを、高度な文法や自然な表現、ニュアンスを用いて、ネイティブスピーカー同等に、明確な発音で広く表現することができる。',
            jp_listening:'高度な文法、自然な表現、ニュアンスを用いて伝えられる複雑なアイデアを、伝達媒体、アクセント、トピックへの親しみに関係なく理解できる。',
            jp_unlock:'',},
        _2:{level:'Advanced',
            en_speaking:'Can express moderately complex ideas nearly effortlessly in a wide variety of social, professional, political, and educational topics, with good command of nuance, appropriate/natural use of expressions, and nearly no major grammatical errors.',
            en_listening:'Can follow a discussion of moderately complex ideas nearly effortlessly in a wide variety of social, professional, political, and educational topics. Follows most expressions, and the finer meanings of nuance',
            en_unlock:'business',
            jp_speaking:'全てのトピックにおいて複雑なアイデアを、高度な文法や自然な表現、ニュアンスを用いて、ネイティブスピーカー同等に、明確な発音で広く表現することができる。',
            jp_listening:'高度な文法、自然な表現、ニュアンスを用いて伝えられる複雑なアイデアを、伝達媒体、アクセント、トピックへの親しみに関係なく理解できる。',
            jp_unlock:'',},
        _3:{level:'Upper Intermediate',
            en_speaking:'Can make explanations and express ideas outside of their topics of interest, with basic command of nuance, using a good range of common expressions comfortably.',
            en_listening:'Can understand explanations and ideas outside of their topics of interest. Able to follow some nuance and common expressions',
            en_unlock:'social',
            jp_speaking:'日常生活のルーティンワークを英語でこなすことができ、日常体験を詳しく説明できる。自分のニーズや要求を伝えることができ、興味のあるテーマについて考えを述べることができる',
            jp_listening:'日常生活に関連する情報や説明を理解し、膨らんだ会話の内容も普通のスピードで理解することができる。',
            jp_unlock:'',},
        _4:{level:'Lower Intermediate',
            en_speaking:'Can handle routine tasks from everyday life, describe everyday experiences in good detail, convey their needs and requirements, and express their ideas about topics that they are interested in. ',
            en_listening:'Can understand information and explanations relevant to everyday life and understand the content of extended speech at a more comfortable speed. ',
            en_unlock:'travel',
            jp_speaking:'全てのトピックにおいて複雑なアイデアを、高度な文法や自然な表現、ニュアンスを用いて、ネイティブスピーカー同等に、明確な発音で広く表現することができる。',
            jp_listening:'高度な文法、自然な表現、ニュアンスを用いて伝えられる複雑なアイデアを、伝達媒体、アクセント、トピックへの親しみに関係なく理解できる。',
            jp_unlock:'',},
        _5:{level:'Upper Beginner',
            en_speaking:'Can produce speech and ask questions using simply constructed sentences. Can talk about themselves.',
            en_listening:'Can understand simply constructed sentences or simple instructions. Can understand monologues about familiar things, provided that the speaker speaks slowly.',
            en_unlock:'',
            jp_speaking:'シンプルな文章を使い、発言をしたり質問したりすることができる。また、自分自身について話すことができる。',
            jp_listening:'簡単な文章や簡単な説明を理解することができる。身近な事柄についてスピードがゆっくりであれば理解できる。',
            jp_unlock:'',},
        _6:{level:'Beginner',
            en_speaking:'Can produce simple mainly isolated phrases and use basic English words and phrases and set expressions.',
            en_listening:'Can understand basic English words and phrases and set expressions. ',
            en_unlock:'',
            jp_speaking:'簡単な単語を繋げてフレーズを作ることができ、基本的な英単語やフレーズ、決まった表現を使うことができる',
            jp_listening:'基本的な英単語やフレーズ、決まった表現を理解することができる。',
            jp_unlock:'',},
};

export const SERVICES = ['English','Japanese'];
//permissions
export const USER = 0;
export const TEACHER = 1;
export const MANAGER = 2;
export const DIRECTOR = 3;

//SERVICES
export const ENG_GROUP_INPERSON=''
