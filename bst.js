import Node from "./node.js";

export default class BST {
  constructor(arr) {
    this.root = arr
      ? this.buildTree(this.removeDuplicates(this.msort(arr)))
      : null;
  }
  buildTree(arr) {
    if (arr.length == 0) {
      return null;
    }

    let middle = Math.floor(arr.length / 2);
    let node = new Node(arr[middle]);

    node.left = this.buildTree(arr.slice(0, middle));
    node.right = this.buildTree(arr.slice(middle + 1));

    return node;
  }
  removeDuplicates(arr) {
    return [...new Set(arr)];
  }
  msort(arr) {
    if (arr.length == 1) return arr;

    let middle = arr.length / 2;
    let left = this.msort(arr.slice(0, middle));
    let right = this.msort(arr.slice(middle));

    let i = 0;
    let j = 0;
    let tmp = [];
    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        tmp.push(left[i]);
        i++;
      } else {
        tmp.push(right[j]);
        j++;
      }
    }

    while (i < left.length) {
      tmp.push(left[i]);
      i++;
    }

    while (j < right.length) {
      tmp.push(right[j]);
      j++;
    }
    return tmp;
  }
  insert(val) {
    let tmp = new Node(val);
    if (!this.root) {
      this.root = tmp;
      return true;
    }

    let currNode = this.root;
    let prevNode = null;
    let left = true;
    while (currNode) {
      if (val > currNode.val) {
        prevNode = currNode;
        currNode = currNode.right;
        left = false;
      } else if (val < currNode.val) {
        prevNode = currNode;
        currNode = currNode.left;
        left = true;
      } else {
        return false;
      }
    }
    if (left) prevNode.left = tmp;
    else prevNode.right = tmp;

    return true;
  }
  deleteItem(val) {
    let currNode = this.root;
    let prevNode = null;
    let left = true;
    while (currNode) {
      if (val > currNode.val) {
        prevNode = currNode;
        currNode = currNode.right;
        left = false;
      } else if (val < currNode.val) {
        prevNode = currNode;
        currNode = currNode.left;
        left = true;
      } else {
        break;
      }
    }
    let valNode = currNode;
    let prevNode2 = null;
    if (!valNode.left && !valNode.right) {
      if (left) prevNode.left = null;
      else prevNode.right = null;
    } else if (
      (valNode.left && !valNode.right) ||
      (!valNode.left && valNode.right)
    ) {
      if (valNode.left) {
        while (currNode) {
          prevNode2 = currNode;
          currNode = currNode.left;
        }
      } else {
        prevNode2.left = null;
        if (left) prevNode.left = valNode;
        else prevNode.right = valNode;
      }
    } else {
      currNode = valNode.right;
      while (currNode.left) {
        console.log(currNode.val);
        prevNode2 = currNode;
        currNode = currNode.left;
      }
      if (prevNode2) prevNode2.left = null;
    }
    if (this.root.val == valNode.val) {
      console.log("hi");
      currNode.left = this.root.left;
      currNode.right = this.root.right;
      this.root = currNode;
    } else if (left) {
      currNode.left = valNode.left;
      prevNode.left = currNode;
    } else if (!left) {
      currNode.left = valNode.left;
      prevNode.right = currNode;
    }
  }
  find(val) {
    let currNode = this.root;
    while (currNode) {
      if (val > currNode.val) currNode = currNode.right;
      else if (val < currNode.val) currNode = currNode.left;
      else return currNode;
    }
  }
  levelOrder(cb) {
    if (typeof cb !== "function")
      throw new Error("Invalid or No Callback Function Provided.");
    let arr = [];
    let queue = [this.root];
    for (let i = 0; i < queue.length; i++) {
      cb(queue[i]);
      // console.log(queue[i].val);
      arr.push(queue[i].val);
      if (queue[i].left) queue.push(queue[i].left);
      if (queue[i].right) queue.push(queue[i].right);
    }
    return arr;
  }
  inOrder(cb) {
    if (typeof cb !== "function")
      throw new Error("Invalid or No Callback Function Provided.");
    let arr = [];
    (function traverse(node) {
      if (node.left) {
        traverse(node.left);
      }
      cb(node);
      // console.log(node.val);
      arr.push(node.val);
      if (node.right) {
        traverse(node.right);
      }
      return node;
    })(this.root);
    return arr;
  }
  preOrder(cb) {
    if (typeof cb !== "function")
      throw new Error("Invalid or No Callback Function Provided.");
    let arr = [];
    (function traverse(node) {
      cb(node);
      // console.log(node.val);
      arr.push(node.val);
      if (node.left) {
        traverse(node.left);
      }
      if (node.right) {
        traverse(node.right);
      }
      return node;
    })(this.root);
    return arr;
  }
  postOrder(cb) {
    if (typeof cb !== "function")
      throw new Error("Invalid or No Callback Function Provided.");
    let arr = [];
    let root = this.root;
    (function traverse(node) {
      if (node.left) {
        let left = traverse(node.left);
        cb(left);
        // console.log(left.val);
        arr.push(left.val);
      }
      if (node.val == root.val) {
        cb(node);
        // console.log(root.val);
        arr.push(root.val);
      }
      if (node.right) {
        let right = traverse(node.right);
        cb(right);
        // console.log(right.val);
        arr.push(right.val);
      }
      return node;
    })(this.root);
    return arr;
  }
  // height(node) {
  //   let nodeHeight;
  //   (function traverse(n) {
  //     let leftHeight;
  //     let rightHeight;
  //     if (n.left) {
  //       leftHeight = traverse(n.left);
  //       console.log(`left: ${leftHeight} node: ${n.val}`);
  //     }
  //     if (n.right) {
  //       rightHeight = traverse(n.right);
  //       console.log(`right: ${rightHeight} node: ${n.val}`);
  //     }
  //     // console.log(`Node: ${n.val} Height: ${height}`);
  //     if (n.val == node.val) {
  //       console.log(`dddd left: ${leftHeight}`);
  //       console.log(`dddd right: ${rightHeight}`);
  //       if (leftHeight && rightHeight) {
  //         nodeHeight = leftHeight >= rightHeight ? leftHeight : rightHeight;
  //       } else nodeHeight = 1;
  //     }

  //     if (leftHeight > rightHeight) return leftHeight + 1;
  //     else if (rightHeight <= leftHeight) return rightHeight + 1;

  //     if (leftHeight) return leftHeight + 1;
  //     if (rightHeight) return rightHeight + 1;

  //     return 1;
  //   })(this.root);
  //   return nodeHeight;
  // }
  height(node) {
    let nodeHeight;
    (function traverse(n) {
      let left = 0,
        right = 0;
      if (n.left) {
        left = traverse(n.left);
      }
      if (n.right) {
        right = traverse(n.right);
      }
      if (n.val == node.val) {
        nodeHeight = Math.max(left, right);
      }

      return Math.max(left + 1, right + 1);
    })(this.root);
    return nodeHeight;
  }
  depth(node) {
    return (function traverse(n, height = -1) {
      // console.log(`Node: ${n.val} Height: ${height}`);
      let left, right;
      if (node.val == n.val) {
        return height + 1;
      }
      if (n.left) {
        left = traverse(n.left, height + 1);
      }
      if (n.right) {
        right = traverse(n.right, height + 1);
      }
      if (left) return left;
      else return right;
    })(this.root);
  }
  isBalanced(n = this.root) {
    let left = false,
      right = false;

    if (n.left && n.right) {
      if (Math.abs(this.height(n.left) - this.height(n.right)) <= 1)
        return true;
    }
    if (n.left) {
      left = this.isBalanced(n.left);
    }
    if (n.right) {
      right = this.isBalanced(n.right);
    }

    return left && right;
  }
  reBalance() {
    let arr = [];
    this.inOrder((n) => arr.push(n.val));
    this.root = this.buildTree(arr);
  }
}

// height(node) {
//   let nodeHeight;
//   (function traverse(n) {
//     let left, right;
//     if (n.left) {
//       left = traverse(n.left);
//     }
//     if (n.right) {
//       right = traverse(n.right);
//     }
//     if (n.val == node.val) {
//       if (left && right) {
//         if (left >= right) nodeHeight = left;
//         else if (right > left) nodeHeight = right;
//       } else if (left) nodeHeight = left;
//       else if (right) nodeHeight = right;
//       else nodeHeight = 0;
//     }

//     if (left >= right) return left + 1;
//     else if (right > left) return right + 1;

//     if (!n.left && !n.right) return 1;
//     else if (left) return left + 1;
//     else if (right) return right + 1;
//   })(this.root);
//   return nodeHeight;
// }
