/**
 * @class AD325-5207
 * @quarter Winter 2020
 * @author Jeremiah Snow
 * @desc A mergesort algorithm.
 */
public class MergeSort {
    
    // Main method, add arrays here to demo
    public static void main(String[] args) {
        // Create the array
        int[] list={2,3,2,5,6,1,-2,14,12};
        System.out.println("Array before sorting:");
        for(int i : list){
            System.out.print(i + " ");
        }
        mergeSort(list);
        System.out.println("Array after sorting:");
        for(int j : list){
            System.out.print(j + " ");
        }
    } // End main

    // Begin mergesort
    public static void mergeSort(int[] list)
    {
        if(list.length > 1)
        {
            // Merge first half
            int[] firstHalf = new int[list.length / 2];
            System.arraycopy(list,0,firstHalf,0,list.length/2);
            mergeSort(firstHalf); // Recursively sort
            
            //  Merge latter half
            int secondHalfLength = list.length - (list.length / 2);
            int[] secondHalf = new int [secondHalfLength];
            System.arraycopy(list, (list.length/2), secondHalf, 0, secondHalfLength);
            mergeSort(secondHalf);

            // Merge sorted halves
            merge(firstHalf,secondHalf,list);
        }
    } // End mergeSort
    
    // Merge method to merge arrays
    public static void merge(int[] list1, int[] list2, int[]temp)
    {
        int current1 = 0; //current index in list1
        int current2 = 0;  //current index in list2
        int current3 = 0; //current temp
        
        while(current1<list1.length && current2<list2.length)
        {
            // This ternary appends and alternates based on the comparison between array elements
            temp[current3++] = list1[current1] < list2[current2] ? list1[current1++] : list2[current2++];
        }
        
        // Catch arrays that are exhausted
        while(current1 < list1.length)
        {
            temp[current3++] = list1[current1++];
        }
        while(current2 < list2.length)
        {
            temp[current3++] = list2[current2++];
        }
    } // End merge
}

