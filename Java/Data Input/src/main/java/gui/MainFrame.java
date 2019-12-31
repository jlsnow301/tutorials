/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import controller.Controller;
import java.io.IOException;

/**
 *
 * @author jerm
 */
public class MainFrame extends JFrame {
    
    private TextPanel textPanel;
    private Toolbar toolbar;
    private FormPanel formPanel;
    private JFileChooser fileChooser;
    private Controller controller;
    private TablePanel tablePanel;
    
    public MainFrame(){
        super("Data Input");
        
        setLayout(new BorderLayout());
        
        toolbar = new Toolbar();
        textPanel = new TextPanel();
        formPanel = new FormPanel();
        tablePanel = new TablePanel();
        controller = new Controller();
        
        tablePanel.setData(controller.getPeople());
        
        tablePanel.setPersonTableListener(new PersonTableListener(){
            public void rowDeleted(int row){
                System.out.println(row);
            }
        });
        
        fileChooser = new JFileChooser();
        fileChooser.addChoosableFileFilter(new PersonFileFilter());
        
        setJMenuBar(createMenuBar());
                
        toolbar.setStringListener(new StringListener(){
            public void textDisplay(String text){
                textPanel.appendText(text);
            }
        });
        
        formPanel.setFormListener(new FormListener(){
           public void formEventOccurred(FormEvent ev){
               controller.addPerson(ev);
               tablePanel.refresh();
           } 
        });
        
        add(formPanel, BorderLayout.WEST);
        add(toolbar, BorderLayout.NORTH);
        add(tablePanel, BorderLayout.CENTER);
        
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setMinimumSize(new Dimension(500, 400));
        setSize(900,600);
        setVisible(true);
        setLocationRelativeTo(null);
        
    }
    
    private JMenuBar createMenuBar(){
        JMenuBar menuBar = new JMenuBar();

        JMenu fileMenu = new JMenu("File");        
        JMenuItem exportDataItem = new JMenuItem("Export Data...");
        JMenuItem importDataItem = new JMenuItem("Import Data...");
        JMenuItem exitItem = new JMenuItem("Exit");
        
        fileMenu.add(exportDataItem);
        fileMenu.add(importDataItem);
        fileMenu.addSeparator();
        fileMenu.add(exitItem);
        
        JMenu viewMenu = new JMenu("View");
        JMenu showMenu = new JMenu("Forms");
        
        JMenuItem showFormItem = new JCheckBoxMenuItem("Client Form");
        showFormItem.setSelected(true);
                
        showMenu.add(showFormItem);
        viewMenu.add(showMenu);
                
        menuBar.add(fileMenu);
        menuBar.add(viewMenu);
        
        showFormItem.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent ev){
                JCheckBoxMenuItem menuItem = (JCheckBoxMenuItem)ev.getSource();
                
                formPanel.setVisible(menuItem.isSelected());
            }
        }); 
        
        fileMenu.setMnemonic(KeyEvent.VK_F);
        viewMenu.setMnemonic(KeyEvent.VK_V);
        exitItem.setMnemonic(KeyEvent.VK_X);
        
        exitItem.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_X, 
                ActionEvent.CTRL_MASK));
        
        // File handlers
        importDataItem.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e){
                if(fileChooser.showOpenDialog(MainFrame.this) == 
                        JFileChooser.APPROVE_OPTION) {
                    try {
                        controller.loadFromFile(fileChooser.getSelectedFile());
                        tablePanel.refresh();
                    } catch (IOException ex) {
                        JOptionPane.showMessageDialog(MainFrame.this, 
                                "Failed to load data.", "Error", 
                                JOptionPane.ERROR_MESSAGE);
                    }
                }
            }
        });
        
        exportDataItem.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e){
                if(fileChooser.showSaveDialog(MainFrame.this) == 
                        JFileChooser.APPROVE_OPTION) {
                    try {
                        controller.saveToFile(fileChooser.getSelectedFile());
                        tablePanel.refresh();
                    } catch (IOException ex) {
                        JOptionPane.showMessageDialog(MainFrame.this, 
                                "Failed to save data.", "Error", 
                                JOptionPane.ERROR_MESSAGE);
                    }
                }
            }
        });
        
        exitItem.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent arg0){
                
                int action = JOptionPane.showConfirmDialog(MainFrame.this, 
                        "Confirm exit:", "Caution", 
                        JOptionPane.OK_CANCEL_OPTION);
                if(action == JOptionPane.OK_OPTION)
                    System.exit(0);
            }
        });
                
        return menuBar;
    }
}
