import $ from 'jquery';
import {TreeNode} from 'butterfly-dag';
import './index.css';

class BaseNode extends TreeNode {
  draw = (opts) => {
    let rewards = opts.options.rewards
    if (rewards === undefined) {
      rewards = []
    }
    let rewardMod = opts.options.rewardMod
    let rewardDiv = ''
    if (rewardMod !== undefined) {
      rewardDiv = `<div class="rewardMod">${rewardMod}</div>`
    }
    // console.log('draw', opts);
    let container = $('<div class="iot-node"></div>')
      .css('top', opts.top + 'px')
      .css('left', opts.left + 'px')
      .attr('id', opts.id);

    let grid = $('<div class="title-grid"></div>')

    let titleDom = $(`
        <div class="image ${opts.options.color}">
            <img src='${opts.options.imageUrl}' width="60" height="60" />
        <div>`);

    let contentDom = $(`
        <div class="content">
          <div class="title">${opts.options.content}</div>
          ${rewardDiv}
          <div class="rewards">
          ${rewards.map(reward => `<img src='/images/rewards/Reward-${reward}.png' width="25" height="25" />`).join('')}
          </div>
        <div>`);

    grid.append(titleDom);
    grid.append(contentDom);
    container.append(grid);
    // container.append(rewardBlock);
    if (typeof opts.options.children !== 'undefined') {
      this.showExpandBtn(container);
    }
    // this.showExpandBtn(container);
    return container[0];
  }

  showExpandBtn(container = this.dom) {
    let expandBtn = $(`<div class='expand-btn'>...</div>`);
    expandBtn.on('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (this.collapsed) {
        this.expand();
      } else {
        this.collapse();
      }
    });
    expandBtn.appendTo(container);
  }
}

export default BaseNode;