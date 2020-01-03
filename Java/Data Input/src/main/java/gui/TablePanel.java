/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui;

import javax.swing.*;
import java.awt.BorderLayout;
import java.util.List;
import model.Person;
import java.awt.event.*;
import model.PersonTableModel;

/**
 *
 * @author jerm
 */
public class TablePanel extends JPanel {
    
    private JTable table;
    private PersonTableModel tableModel;
    private JPopupMenu popup;
    private PersonTableListener personTableListener;
        
    public TablePanel(){
        
        tableModel = new PersonTableModel();
        table = new JTable();
        popup = new JPopupMenu();
        
        JMenuItem removeItem = new JMenuItem("Delete Row");
        popup.add(removeItem);
        
        setLayout(new BorderLayout());
        
        add(new JScrollPane(table), BorderLayout.CENTER);
        
        table.addMouseListener(new MouseAdapter() {
            @Override
            public void mousePressed(MouseEvent e){
                
                int row = table.rowAtPoint(e.getPoint());
                table.getSelectionModel().setSelectionInterval(row, row);
                if(e.getButton() == MouseEvent.BUTTON3){
                    popup.show(table, e.getX(), e.getY());
                }
            }
        });
        
        removeItem.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent ev) {
                int row = table.getSelectedRow();
                if(personTableListener != null){
                    personTableListener.rowDeleted(row);
                    tableModel.fireTableRowsDeleted(row, row);
                }
            }
        });
    }
    
    public void setData(List<Person> db) {
        tableModel.setData(db);
    }
    
    public void refresh(){
        tableModel.fireTableDataChanged();
        System.out.println("yo");
    }
    
    public void setPersonTableListener(PersonTableListener listener){
        this.personTableListener = listener;        
    }
}
