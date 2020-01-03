/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui;

import javax.swing.*;
import java.awt.*;
import javax.swing.border.Border;
import java.awt.event.*;

/**
 *
 * @author jerm
 */
public class FormPanel extends JPanel {
    
    private JLabel nameLabel;
    private JLabel occupationLabel;
    private JTextField nameField;
    private JTextField occupationField;
    private JButton okBtn;
    private FormListener formListener;
    private JList ageList;
    private JComboBox empCombo;
    private JCheckBox citizenCheck;
    private JTextField taxField;
    private JLabel taxLabel;
    private JRadioButton maleRadio;
    private JRadioButton femaleRadio;
    private ButtonGroup genderGroup;
    
    /////////////////////////////////////////////////////////////////
    public FormPanel(){
        Dimension dim = getPreferredSize();
        dim.width = 250;
        setPreferredSize(dim);
        
        nameLabel = new JLabel("Name: ");
        occupationLabel = new JLabel("Occupation: ");
        nameField = new JTextField(10);
        occupationField = new JTextField(10);
        ageList = new JList();
        empCombo = new JComboBox();
        citizenCheck = new JCheckBox();
        taxField = new JTextField(10);
        taxLabel = new JLabel("Tax ID: ");
        okBtn = new JButton("OK");
        
        // Set up Mnemonics
        okBtn.setMnemonic(KeyEvent.VK_E);
        
        nameLabel.setDisplayedMnemonic(KeyEvent.VK_N);
        nameLabel.setLabelFor(nameField);
        
        occupationLabel.setDisplayedMnemonic(KeyEvent.VK_O);
        occupationLabel.setLabelFor(occupationField);
        
        maleRadio = new JRadioButton("Male");
        femaleRadio = new JRadioButton("Female");
        maleRadio.setActionCommand("male");
        femaleRadio.setActionCommand("female");
        genderGroup = new ButtonGroup();
        maleRadio.setSelected(true);
        
        // Set up gender radios
        genderGroup.add(maleRadio);
        genderGroup.add(femaleRadio);
                
        // Set up tax ID
        taxLabel.setEnabled(false);
        taxField.setEnabled(false);
        
        citizenCheck.addActionListener((ActionEvent arg0) -> {
            boolean isTicked = citizenCheck.isSelected();
            taxLabel.setEnabled(isTicked);
            taxField.setEnabled(isTicked);
        });
        
        // Set up the list box
        DefaultListModel ageModel = new DefaultListModel();
        ageModel.addElement(new AgeCategory(0, "Under 18"));
        ageModel.addElement(new AgeCategory(1, "Under 65"));
        ageModel.addElement(new AgeCategory(2, "Over 65"));
        ageList.setModel(ageModel);
        ageList.setPreferredSize(new Dimension(100, 60));
        ageList.setBorder(BorderFactory.createEtchedBorder());
        ageList.setSelectedIndex(1);
        
        // Set up the combo box
        DefaultComboBoxModel empModel = new DefaultComboBoxModel();
        empModel.addElement("employed");
        empModel.addElement("self-employed");
        empModel.addElement("unemployed");
        empCombo.setModel(empModel);
        empCombo.setSelectedIndex(0);
        empCombo.setEditable(true);
       
        okBtn.addActionListener((ActionEvent arg0) -> {
            String name = nameField.getText();
            String occupation = occupationField.getText();
            AgeCategory ageCat = (AgeCategory) ageList.getSelectedValue();
            String empCat = (String) empCombo.getSelectedItem();
            String taxId = taxField.getText();
            boolean usCitizen = citizenCheck.isSelected();
            String gender = genderGroup.getSelection().getActionCommand();
                                
            FormEvent ev = new FormEvent(this, name, occupation, 
                ageCat.getId(), empCat, taxId, usCitizen, gender);

            if(formListener != null){
                formListener.formEventOccurred(ev);
            }
        });
    
                
        Border innerBorder = BorderFactory.createTitledBorder("Add Person");
        Border outerBorder = BorderFactory.createEmptyBorder(5,5,5,5);
        setBorder(BorderFactory.createCompoundBorder(outerBorder, innerBorder));
        
        layoutComponents();
    }
    
    /////////////////////////////////////////////////////////////////
    public void layoutComponents(){
        
        setLayout(new GridBagLayout());
        
        GridBagConstraints gc = new GridBagConstraints();
        
        // First Row ////////////////////////////////////////////
        gc.gridy = 0;
        gc.weightx = 1;
        gc.weighty = 0.1;
                
        gc.gridx = 0;
        gc.fill = GridBagConstraints.NONE;
        gc.anchor = GridBagConstraints.LINE_END;
        gc.insets = new Insets(0,0,0,5);
        add(nameLabel, gc);
        
        gc.gridx = 1;
        gc.gridy = 0;
        gc.insets = new Insets(0,0,0,0);
        gc.anchor = GridBagConstraints.LINE_START;
        add(nameField, gc);
        
        // Next Row ///////////////////////////////////////////
        gc.gridy++;
        
        gc.weightx = 1;
        gc.weighty = 0.1;
        
        gc.gridx = 0;
        gc.insets = new Insets(0,0,0,5);
        gc.anchor = GridBagConstraints.LINE_END;
        add(occupationLabel, gc);
        
        gc.gridy = 1;
        gc.gridx = 1;
        gc.insets = new Insets(0,0,0,0);
        gc.anchor = GridBagConstraints.LINE_START;
        add(occupationField, gc);
        
        // Next Row ///////////////////////////////////////////
        gc.gridy++;
        
        gc.weightx = 1;
        gc.weighty = 0.2;
        
        gc.gridx = 0;
        gc.insets = new Insets(0,0,0,5);
        gc.anchor = GridBagConstraints.FIRST_LINE_END;
        add(new JLabel("Age: "), gc);
        
        gc.gridy = 2;
        gc.gridx = 1;
        gc.insets = new Insets(0,0,0,0);
        gc.anchor = GridBagConstraints.FIRST_LINE_START;
        add(ageList, gc);    
        
        // Next Row ///////////////////////////////////////////
        gc.gridy++;
        
        gc.weightx = 1;
        gc.weighty = 0.2;
        
        gc.gridx = 0;
        gc.insets = new Insets(0,0,0,5);
        gc.anchor = GridBagConstraints.FIRST_LINE_END;
        add(new JLabel("Employment: "), gc);
        
        gc.gridx = 1;
        gc.insets = new Insets(0,0,0,0);
        gc.anchor = GridBagConstraints.FIRST_LINE_START;
        add(empCombo, gc);
        
        // Next Row ///////////////////////////////////////////
        gc.gridy++;
        
        gc.weightx = 1;
        gc.weighty = 0.2;
        
        gc.gridx = 0;
        gc.insets = new Insets(0,0,0,5);
        gc.anchor = GridBagConstraints.FIRST_LINE_END;
        add(new JLabel("US Citizen: "), gc);
        
        gc.gridx = 1;
        gc.insets = new Insets(0,0,0,0);
        gc.anchor = GridBagConstraints.FIRST_LINE_START;
        add(citizenCheck, gc);
        
        // Next Row ///////////////////////////////////////////
        gc.gridy++;
        
        gc.weightx = 1;
        gc.weighty = 0.2;
        
        gc.gridx = 0;
        gc.insets = new Insets(0,0,0,5);
        gc.anchor = GridBagConstraints.FIRST_LINE_END;
        add(taxLabel, gc);
        
        gc.gridx = 1;
        gc.insets = new Insets(0,0,0,0);
        gc.anchor = GridBagConstraints.FIRST_LINE_START;
        add(taxField, gc);
        
        // Next Row ///////////////////////////////////////////
        gc.gridy++;
        
        gc.weightx = 1;
        gc.weighty = 0.05;
        
        gc.gridx = 0;
        gc.insets = new Insets(0,0,0,5);
        gc.anchor = GridBagConstraints.LINE_END;
        add(new JLabel("Sex: "), gc);
        
        gc.gridx = 1;
        gc.insets = new Insets(0,0,0,0);
        gc.anchor = GridBagConstraints.FIRST_LINE_START;
        add(maleRadio, gc);
        
        // Next Row ///////////////////////////////////////////
        gc.gridy++;
        
        gc.weightx = 1;
        gc.weighty = 0.2;
        
        gc.gridx = 1;
        gc.insets = new Insets(0,0,0,0);
        gc.anchor = GridBagConstraints.FIRST_LINE_START;
        add(femaleRadio, gc);
            
        // Next Row ///////////////////////////////////////////
        gc.gridy++;
        
        gc.weightx = 1;
        gc.weighty = 2.0;

        gc.gridx = 1;
        gc.insets = new Insets(0,0,0,0);
        gc.anchor = GridBagConstraints.FIRST_LINE_START;
        add(okBtn, gc);
 
    }

    public void setFormListener(FormListener listener){
        this.formListener = listener;
    }
}

/////////////////////////////////////////////////////////////////
class AgeCategory {
    private String text;
    private int id;
    
    public AgeCategory(int id, String text) {
        this.id = id;
        this.text = text;
    }
    public String toString(){
        return text;
    }
    
    public int getId(){
        return id;
    }
}
