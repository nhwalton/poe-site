import React, { Component } from 'react';
import {TreeCanvas} from 'butterfly-dag';
import DagreCanvas from './dagre-canvas';
import RelationEdge from './edge';

import 'butterfly-dag/dist/index.css';
import './index.css';

class dagreTree extends Component {
    componentDidMount() {
        const data = this.props.data
        console.log('dagreTree', data)
        let root = document.getElementById('dag-canvas');
        this.canvas = new DagreCanvas({
          root: root,
          disLinkable: false,
          linkable: false,
          draggable: false,
          zoomable: true,
          moveable: true,
          layout: {
            type: 'dagreLayout',
            options: {
              rankdir: 'TB',
              nodesep: 60,
              ranksep: 60,
              controlPoints: true,
            },
          },
          theme: {
            edge: {
              shapeType: 'Manhattan',
              // arrow: true,
              // arrowPosition: 0.5,
              Class: RelationEdge
            }
          }
        });
        this.canvas.draw(data, {}, () => {
          this.canvas.focusCenterWithAnimate();
        });
      }

    render() {
        return (
          <div className='dagreLayout-page'>
            <div className="flow-canvas" id="dag-canvas">
            </div>
          </div>
        );
      }
}

export default dagreTree;