from flask import request, render_template, redirect, url_for, session, g

from api.routes import core

#@core.route('/')
#def index():
#    """Home page -> redirects based on auth status"""
#    if hasattr(g, 'user') and g.user:
#        return redirect(url_for('auth.login'))
#    return render_template('core/index.html')

