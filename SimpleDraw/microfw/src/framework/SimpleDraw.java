package framework;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Container;
import java.awt.Dimension;
import java.awt.GridBagConstraints;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.FocusEvent;
import java.awt.event.FocusListener;

import javax.swing.BorderFactory;
import javax.swing.Box;
import javax.swing.BoxLayout;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JTextArea;
import javax.swing.border.Border;

public class SimpleDraw {

	JButton clearBtn, blackBtn, blueBtn, greenBtn, redBtn, magentaBtn;
	DrawArea drawArea;
	ActionListener actionListener = new ActionListener() {

		public void actionPerformed(ActionEvent e) {

		}
	};

	public static void main(String[] args) {
		new SimpleDraw().show();
	}

	public void show() {
		// create main frame
		JFrame frame = new JFrame("Swing Paint");
		Container content = frame.getContentPane();
		// set layout on content pane
		content.setLayout(new BorderLayout());
		
			
		drawArea = new DrawArea();
		drawArea.setName("drawArea");
		content.add(drawArea, BorderLayout.CENTER);
		
		
		JPanel pluginLoader = new JPanel();
		JTextArea textArea = new JTextArea("Plugin name", 1, 40);
		textArea.addFocusListener(new FocusListener() {
			@Override
			public void focusLost(FocusEvent e) {
				((JTextArea) e.getSource()).setText("Plugin name");
			}

			@Override
			public void focusGained(FocusEvent e) {
				((JTextArea) e.getSource()).setText("");

			}
		});
		Border border = BorderFactory.createLineBorder(Color.BLACK);
		textArea.setBorder(BorderFactory.createCompoundBorder(border, 
		            BorderFactory.createEmptyBorder(5, 10, 5, 10)));
		JButton pluginLoadButton = new JButton("Load");
		pluginLoader.add(textArea);
		pluginLoader.add(pluginLoadButton);

		JPanel pluginBar = new JPanel();
		pluginBar.setLayout(new BorderLayout());
		
		pluginBar.add(pluginLoader);
		content.add(pluginBar, BorderLayout.NORTH);

		frame.setSize(600, 600);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.setVisible(true);
		frame.toFront();
		frame.requestFocus();
	}

}