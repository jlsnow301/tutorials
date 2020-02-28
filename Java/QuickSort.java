/**
 * @class AD325-5207
 * @quarter Winter 2020
 * @author Jeremiah Snow
 * @desc A quicksort algorithm.
 */
public class QuickSort {
    
    // Default method
    public static void quickSort(int[] list){
        quickSort(list, 0, list.length - 1);
    }
    
    // Overloaded method
    public static void quickSort(int[] list, int first, int last){
        if(last > first){
            int pivotIndex = partition(list, first, last);
            quickSort(list, first, pivotIndex -1);
            quickSort(list, pivotIndex+1, last);
        }
    }
    
    // Creates the partition with pivot included
    public static int partition(int[] list, int first, int last){
        int pivot = list[first];
        int low = first+1;
        int high = last;
        
        while(high > low){
            while(low <= high && list[low] <= pivot)
                low++;
            while(low <= high && list[high] > pivot)
                high--;
            if(high > low){
                int temp = list[high];
                list[high] = list[low];
                list[low] = temp;
            }
        }
        
        while(high > first && list[high] >= pivot)
            high--;
        
        if(pivot > list[high]){
            list[first] = list[high];
            list[high] = pivot;
            return high;
        } else {
            return first;
        }
    } // End partition
    
    // Main method
    public static void main(String[] args) {
        // Add the integers to sort
        int[] list = {2,3,2,5,6,1,-2,3,14,12};
        System.out.println("List prior to sorting:");
        for(int i : list){
            System.out.print(i + " ");
        }
        quickSort(list);
        System.out.println("List after sorting:");
        for(int j : list){
            System.out.print(j + " ");
        }
    } // End main
}
