/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;


/**
 *
 * @author jerm
 */
public class Toolbar extends JPanel implements ActionListener {
    private JButton helloButton;
    private JButton goodbyeButton;
    
    private StringListener textListener;
    
    public Toolbar(){
        setBorder(BorderFactory.createEtchedBorder());
        helloButton = new JButton("Hello");
        goodbyeButton = new JButton("Goodbye");
        
        helloButton.addActionListener(this);
        goodbyeButton.addActionListener(this);
        
        setLayout(new FlowLayout(FlowLayout.LEFT));
        
        add(helloButton);
        add(goodbyeButton);
    }
    
    public void setStringListener(StringListener listener){
        this.textListener = listener;
    }
    
    @Override
    public void actionPerformed(ActionEvent e){
        JButton clicked = (JButton) e.getSource();
        
        if(clicked == helloButton && textListener != null)
            textListener.textDisplay("Hello\n");
        else if(clicked == goodbyeButton && textListener != null)
            textListener.textDisplay("Goodbye\n");
    }
}
