/*
 * Created on Oct 26, 2004
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package plugins;

import javax.swing.JButton;
import javax.swing.JLabel;

import framework.Plugin;

/**
 * @author aaguiar
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class NotSoSimplePlugin extends Plugin {
	
	public NotSoSimplePlugin() {
		this.name = "Not so simple plugin";
		JLabel b = new JLabel();
		b.setText("Simple label");
		this.component = b;
	}

}
