package com.mycompany.binarysearchtree;

/**
 * @class AD325-5207
 * @quarter Winter 2020
 * @author Jeremiah Snow
 * @desc A binary search tree.
 */
public class IntTreeNode {
    
    // Data fields
    public int data;
    public IntTreeNode left;
    public IntTreeNode right;
    
    // Constructor for leaf node
    public IntTreeNode(int data){
        this(data, null, null);
    }
    
    // Constructor for branch nodes
    public IntTreeNode(int data, IntTreeNode left, IntTreeNode right){
        // Attach data to node
        this.data = data;
        this.left = left;
        this.right = right;
    }
    
}
