import parseAct from './parseAct';
import parseGuide from './parseGuide';

function parseJson (data) {
    let html;
    switch(data.type) {
        case 'act':
            html = parseAct(data);
            break;
        // case 'mechanic':
        //     parseMechanic(data);
        //     break;
        case 'guide':
            html = parseGuide(data);
            break;
    }
    return(html);
}

export default parseJson;