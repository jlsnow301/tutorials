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
    
    /**
     *
     */
    private static final long serialVersionUID = 5676481243003161519L;
    private final JTable table;
    private final PersonTableModel tableModel;
    private final JPopupMenu popup;
    private PersonTableListener personTableListener;

    public TablePanel() {

        tableModel = new PersonTableModel();
        table = new JTable();
        popup = new JPopupMenu();

        final JMenuItem removeItem = new JMenuItem("Delete Row");
        popup.add(removeItem);

        setLayout(new BorderLayout());

        add(new JScrollPane(table), BorderLayout.CENTER);

        table.addMouseListener(new MouseAdapter() {
            @Override
            public void mousePressed(final MouseEvent e) {

                final int row = table.rowAtPoint(e.getPoint());
                table.getSelectionModel().setSelectionInterval(row, row);
                if (e.getButton() == MouseEvent.BUTTON3) {
                    popup.show(table, e.getX(), e.getY());
                }
            }
        });

        removeItem.addActionListener((final ActionEvent ev) -> {
            final int row = table.getSelectedRow();
            if (personTableListener != null) {
                personTableListener.rowDeleted(row);
                tableModel.fireTableRowsDeleted(row, row);
            }
        });
    }

    public void setData(final List<Person> db) {
        tableModel.setData(db);
    }

    public void refresh() {
        tableModel.fireTableDataChanged();
    }

    public void setPersonTableListener(final PersonTableListener listener) {
        this.personTableListener = listener;        
    }
}
