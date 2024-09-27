import BST from "./bst.js";

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.val}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let arr = (function generateArr() {
  let arr = [];
  for (let i = 0; i < 1 + Math.round(Math.random() * 14); i++) {
    arr.push(Math.round(Math.random() * 100));
  }
  return arr;
})();

let bst = new BST(arr);

prettyPrint(bst.root);
console.log(bst.isBalanced());

(function unbalanceBST(bst) {
  for (let i = 0; i < 1 + Math.round(Math.random() * 9); i++) {
    bst.insert(1000 + Math.round(Math.random() * 100));
  }
  prettyPrint(bst.root);
  return;
})(bst);
console.log(bst.isBalanced());

(function rebalanceBST(bst) {
  bst.reBalance();
  prettyPrint(bst.root);
})(bst);

console.log(bst.isBalanced());

(function printBST(bst) {
  const cb = (n) => {
    return n;
  };
  console.log(bst.levelOrder(cb));
  console.log(bst.inOrder(cb));
  console.log(bst.preOrder(cb));
  console.log(bst.postOrder(cb));
})(bst);
