import React, { Component } from 'react';
import {TreeCanvas} from 'butterfly-dag';

import 'butterfly-dag/dist/index.css';
import './index.css';

class CompactBoxTree extends Component {
  componentDidMount() {
    const data = this.props.data
    let root = document.getElementById('dag-canvas');
    this.canvas = new TreeCanvas({
        root: root,
        disLinkable: false, // 可删除连线
        linkable: false,    // 可连线
        draggable: false,   // 可拖动
        zoomable: true,    // 可放大
        moveable: true,    // 可平移
        theme: {
          edge: {
            shapeType: 'Manhattan',
            arrow: false,
          }
        },
        layout: {
          type: 'compactBox',
          options: {
            direction: 'TB',
            getHeight(d) {
              return 160;
            },
            getWidth(d) {
              return 280;
            },
            getHGap(d) {
              return 20;
            },
            getVGap(d) {
              return 40;
            }
          }
        },
      });
      this.canvas.draw(data, {}, () => {
        this.canvas.focusCenterWithAnimate();
      });
    }
    render() {
        return (
            <div className='compact-box-tree-page'>
                <div className="compact-box-tree-canvas" id="dag-canvas">
                </div>
            </div>
        );
    }
  }

export default CompactBoxTree;