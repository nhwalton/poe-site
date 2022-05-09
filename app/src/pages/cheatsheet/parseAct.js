import React from 'react';
import { ListGroup } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown'

function parseAct (data) {
    return(
        <React.Fragment>    
            <h2>{data.name}</h2>
            <ListGroup as ="ol" numbered
            style={{
                textAlign: 'left'
            }}
            >
            {data.steps.map((step, index) => {
                return(
                    <ListGroup.Item as="li" variant="level" className="d-flex justify-content-between align-items-start" key={`step${index}`}>
                        <div className="ms-2 me-auto">
                        <div><ReactMarkdown>{step.text}</ReactMarkdown></div>
                        {step.substeps !== undefined ? step.substeps.map(
                            (substep, index) => {
                                return(
                                    <div key={`substep${index}`}>
                                        <ReactMarkdown>{substep}</ReactMarkdown>
                                        {/* aaa */}
                                    </div>
                                )
                                }
                            ) : null}
                        </div>
                    </ListGroup.Item>
                )
            })}
            </ListGroup>
        </React.Fragment>
    )
}

export default parseAct;