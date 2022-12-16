import React, { useEffect, useState } from 'react';
import { Button, Card, Row, Container, Col, Form, Breadcrumb, ListGroup } from 'react-bootstrap';
import parseJson from './parseJson';
import guides from './content/guides.json';
import './style.css';
import { useParams, Link } from 'react-router-dom';
import ReactGA from "react-ga";

const CheatSheet = () => {

    const display = null;
    const [markHtml, setMarkHtml] = useState('');
    const [currentGuide, setCurrentGuide] = useState('');
    const [currentGroup, setCurrentGroup] = useState('');
    const [guideIndex, setGuideIndex] = useState(0);
    const [groupLength, setGroupLength] = useState(0);

    const defGuideValues = []
    for (let i = 0; i < 76; i++) {
        defGuideValues.push('N/A')
    }

    const [guideValues, setGuideValues] = React.useState(defGuideValues);
    
    async function fetchGuideValues() {
        const response = await fetch('/api/guide_values');
        return response.json();
    };

    useEffect(() => {
        fetchGuideValues().then(result => {
            if (result !== 'Error') {
                setGuideValues(result)
            }
            else {
                setGuideValues(defGuideValues)
                if (window.location.hostname !== 'localhost') {
                    const eventDetails = {
                        category: 'Error',
                        action: 'Guide-Fetch-Values',
                        label: 'None',
                    }
                    ReactGA.event(eventDetails);
                }
                }
            }
        )
    }, []);

    const handleGuideChange = (name, file, group) => {
        setCurrentGuide(name);
        import(`./content/${file}.json`).then(data => {
            setMarkHtml(parseJson(data, guideValues));
        });
        setCurrentGroup(group);
    }

    let { guide } = useParams();

    // console.log('guide', guide);
    // console.log('useParams', useParams());
    console.log('guideValues', guideValues);

    useEffect(() => {
        if (guide === undefined) {
            handleGuideChange('', 'guideHome', 'General');
        } else {
            for (let i = 0; i < Object.keys(guides).length; i++) {
                const thisGroup = guides[Object.keys(guides)[i]];
                for (let j = 0; j < thisGroup.length; j++) {
                    if (thisGroup[j].file === guide) {
                        setGroupLength(thisGroup.length);
                        setGuideIndex(j);
                        handleGuideChange(thisGroup[j].name, thisGroup[j].file, Object.keys(guides)[i]);
                        break;
                    }
                }
            }
        }
    }, [guideValues]);

    return(
        <div className={`cheatsheet page ${display}`}>
            <Container className="my-4">
                <Card >
                    <Row>
                        <Col xs={2} as="section">
                            <ListGroup className="py-4" style={{width: "100%"}}>
                                {Object.keys(guides).map((group, index) => {
                                    return(
                                        <div className="groupSection">
                                            <h4 className="px-4">{group}</h4>
                                            {guides[group].map((guide, index) => {
                                                const isActive = (guide.name === currentGuide) ? 'active' : '';
                                                return(
                                                    <ListGroup.Item
                                                        key={`guide${index}`}
                                                        variant="guideNav"
                                                        as="li"
                                                        className={`pt-2 px-2 ${isActive}`}>
                                                            <Link to={`/cheatsheet/${guide.file}`} onClick={() => handleGuideChange(guide.name, guide.file, group)} >{guide.name}</Link>
                                                    </ListGroup.Item>
                                                    )
                                            })}
                                        </div>
                                    )
                                })}
                            </ListGroup>
                        </Col>
                        <Col xs={10} as="section">
                            <Card className="p-4 guideCard">
                                <Row style={{justifyContent: "space-between"}}>
                                    <Col>
                                        <Breadcrumb className="ps-0" >
                                            <Breadcrumb.Item href="/cheatsheet">
                                                {currentGroup}
                                            </Breadcrumb.Item>
                                            <Breadcrumb.Item>
                                                {currentGuide}
                                            </Breadcrumb.Item>
                                        </Breadcrumb>
                                    </Col>
                                    <Col>
                                    </Col>
                                </Row>
                                <Row>
                                    {/* <GuideRender guide={guide} markHtml={markHtml}/> */}
                                    {markHtml}
                                </Row>
                                {/* {(guideIndex !== groupLength && groupLength > 1) ?
                                        <Link to={`/cheatsheet/${guides[currentGroup][guideIndex + 1].file}`}>
                                            Next: {guides[currentGroup][guideIndex + 1].name}
                                        </Link>
                                        :
                                        ''} */}
                            </Card>
                        </Col>
                    </Row>
                </Card>
            </Container>
        </div>
    )
}

export default CheatSheet;