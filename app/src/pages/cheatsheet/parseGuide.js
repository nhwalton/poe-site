import React from 'react';
import { ListGroup, Image } from 'react-bootstrap';
import atlasPassives from './content/atlas_passives.json';
import questItems from './content/quest_items.json';
import { Col, Row } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown'
import itemPrices from './content/priceImport.json';
import Table from 'react-bootstrap/Table';
import POEItems from '../../assets/items.json';

function parseGuide (data, guideValues) {

    // console.log('guideValues', guideValues);

    function parseStep (step, index) {
        let html;
        if (typeof step !== 'string') {
            switch(step.type) {
                case 'atlas passive group':
                    html = (
                        <div className="guideBox pt-2 mb-4">
                            <Row className="mt-2 mb-4" style={{justifyContent: "center"}}>
                                {step.passives.map((passive, index) => {
                                    if (passive.type === 'atlas passive') {
                                        const atlasPassive = atlasPassives[passive.passiveName];
                                        return(
                                            <Col md="auto" key={passive + index}>
                                                <poe-passive
                                                    as-icon
                                                    reference={atlasPassive['name']}
                                                    icon-size="lg"
                                                ></poe-passive>
                                                {window.HoradricHelper.PathOfExile.applyConfig({
                                                    reference: atlasPassive['name'],
                                                    iconUrl: "/images/atlas_passives/" + atlasPassive['image_name'] + ".png",
                                                    data: {
                                                        name: atlasPassive['name'],
                                                        type: (atlasPassive['notable']) ? 'atlas notable' : 'atlas basic',
                                                        sections: {
                                                        description: atlasPassive['text'],
                                                        },
                                                    },
                                                    })}
                                            </Col>
                                        )
                                    } else {
                                        return(
                                            <Col md="auto" key={passive + index} className="arrow-right">
                                            </Col>
                                        )
                                    }
                                })}
                            </Row>
                        </div>
                    );
                    break;
                case 'numbered list':
                    html = (
                        <ListGroup as="ul" variant="flush" numbered className="mt-2 mb-4">
                            {step.items.map((item, index) => {
                                return(
                                    <ListGroup.Item as="li" key={`step${index}`}> {item} </ListGroup.Item>
                                )
                            })}
                        </ListGroup>
                    );
                    break;
                case 'quest items':
                    const items = ["The Maven's Beacon", "Flesh Compass", "Luminous Astrolabe"]
                    html = (
                        <div className="guideBox pt-2 mb-4">
                            <Row className="mt-2 mb-4" style={{justifyContent: "center"}}>
                                {items.map((item, index) => {
                                    const questItem = questItems[item];
                                    return(
                                        <Col md="auto" key={item + index}>
                                            <poe-item
                                                as-icon
                                                reference={questItem['image_name']}
                                                icon-size="auto"
                                            ></poe-item>
                                            {window.HoradricHelper.PathOfExile.applyConfig({
                                                reference: questItem['image_name'],
                                                iconUrl: "/images/quest_items/" + questItem['image_name'] + ".png",
                                                data: {
                                                    rarity: "currency",
                                                    name: questItem['name'],
                                                    sections: {
                                                        modifiers: questItem['text'],
                                                    },
                                                },
                                                })}
                                        </Col>
                                    )
                                })}
                            </Row>
                        </div>
                    )
                    break;
                case 'custom item':
                    console.log('custom item: ', step.customItems);
                    html = (
                        <div className="guideBox pt-2 mb-4">
                            <Row className="mt-2 mb-4" style={{justifyContent: "center"}}>
                                {step.customItems.map((item, index) => {
                                    console.log('item: ', item.text);
                                    return(
                                        <Col md="auto" key={item + index}>
                                            <poe-item
                                                as-showcase
                                                icon-inside
                                                reference={item.identifier}
                                                icon-size="auto"
                                            ></poe-item>
                                            {window.HoradricHelper.PathOfExile.applyConfig({
                                                reference: item.identifier,
                                                iconUrl: POEItems[item.name],
                                                data: {
                                                    rarity: item.rarity,
                                                    name: item.name,
                                                    sections: {
                                                        modifiers: item.text,
                                                    },
                                                },
                                                })}
                                        </Col>
                                    )
                                })}
                            </Row>
                        </div>
                    )
                    break;
                case 'price import':
                    html = (
                        <div>
                            <Table striped bordered hover variant="custom">
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {step.items.map((item, index) => {
                                    return(
                                    <tr>
                                        <td>{item.name}</td>
                                        <td>{guideValues[item.index - 1]}</td>
                                    </tr>
                                    )
                                })}
                                </tbody>
                            </Table>
                        </div>
                    )
                    break;
                case 'custom table':
                    html = (
                        <Table striped bordered hover variant="custom">
                            <thead>
                                <tr>
                                    {step.headers.map((header, index) => {
                                        return(
                                            <th key={header + index}>{header}</th>
                                        )
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {step.rows.map((row, index) => {
                                    return(
                                        <tr key={row + index}>
                                            {row.map((cell, index) => {
                                                return(
                                                    <td key={cell + index}>{cell}</td>
                                                )
                                            })}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    )
                    break;
                case 'image':
                    html = (
                        <div className="guide-image-wrapper">
                            <Image fluid src={step.src} alt={step.alt} className="guide-image"/>
                        </div>
                    )
                    break;
                default:
                    html = (
                        <div>
                            <ReactMarkdown
                                linkTarget={'_blank'}
                                components={{
                                    a: ({ node, children, ...props}) => {
                                        const linkProps = props;
                                        if (props.target === '_blank') {
                                            linkProps['rel'] = 'noopener noreferrer';
                                        }
                                        return <a {...linkProps} className="externalLink">{children}</a>
                                    }
                                }}
                            >
                            {step.text}
                            </ReactMarkdown>
                        </div>
                    );
        }
        } else {
            html = (
                <ReactMarkdown
                    linkTarget={'_blank'}
                    components={{
                        a: ({ node, children, ...props}) => {
                            const linkProps = props;
                            if (props.target === '_blank') {
                                linkProps['rel'] = 'noopener noreferrer';
                            }
                            return <a {...linkProps} className="externalLink">{children}</a>
                        }
                    }}
                >
                {step}
                </ReactMarkdown>
            )
        }
        return(html);
    }
    return(
        <React.Fragment>
            <ListGroup as ="ul"
            style={{
                textAlign: 'left'
            }}
            >
            {data.steps.map((step, index) => {
                return(
                    <ListGroup.Item variant="guide" key={step + index}>
                        {parseStep(step, index)}
                    </ListGroup.Item>
                    )
                })}
            </ListGroup>
        </React.Fragment>
    )
}

export default parseGuide;