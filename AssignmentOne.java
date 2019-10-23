/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.assignmentone;

/**
 * @class AD300-5204
 * @quarter Fall 2019
 * @author Jeremiah Snow
 * @desc A method that accepts an ArrayList
 * then outputs sorted results.
 */
import java.util.ArrayList;
import java.util.Collections;
import java.util.Scanner;

public class AssignmentOne {
    // Main method prompts user for input, then outputs figures
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        System.out.print("Enter integers, followed by a space: ");
        String inputLine = scan.nextLine();
        // Creating a second loop to avoid an endless while loop
        Scanner input = new Scanner(inputLine);
        ArrayList<Integer> list = new ArrayList<>();
        while(input.hasNext()){
            if(input.hasNextInt())
                list.add(input.nextInt());
        }
        // Remove duplicates from arraylist
        removeDuplicate(list);
        // Output
        System.out.print("The distinct integers are: ");
        for(int i = 0; i < list.size(); i++)
            System.out.print(list.get(i) + " ");
        System.out.println();
        // Sorted
        Collections.sort(list);
        System.out.println("The sorted integers are: " + list.toString());
        // Min/max
        System.out.println("The max element is " + Collections.max(list));
        System.out.println("The min element is " + Collections.min(list));
        // Shuffled
        Collections.shuffle(list);
        System.out.println("The shuffled integers are: " + list.toString());
    }
    
    // This method creates an "overflow" list to collect only uniques
    public static void removeDuplicate(ArrayList<Integer> list){
        ArrayList<Integer> tempList = new ArrayList<>();
        for(int i = 0; i < list.size(); i++){
            // Adds only the unique numbers to the temporary list
            if(!tempList.contains(list.get(i)))
                tempList.add(list.get(i));
        }
        list.clear();
        for(int j = 0; j < tempList.size(); j++){
            list.add(tempList.get(j));
        }
        // Does the temp list remain after this method is finished?
        tempList.clear();
    } 

}
