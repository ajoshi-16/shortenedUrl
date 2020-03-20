from flask import Blueprint, render_template

client_blueprint = Blueprint('client', __name__, template_folder='./templates')


@client_blueprint.route('/about')
def about():
    """

    :return:
    """
    return render_template('about.html')


@client_blueprint.route('/auto_doc')
def auto_doc():
    """

    :return:
    """
    return render_template('auto_doc.html')


@client_blueprint.route('/build_status')
def build_status():
    """

    :return:
    """
    return render_template('build_status.html')


@client_blueprint.route('/coverage')
def coverage():
    """

    :return:
    """
    return render_template('coverage.html')


@client_blueprint.route('/')
@client_blueprint.route('/index')
def index():
    """
    :return:
    """
    return render_template('index.html')


@client_blueprint.route('/run_auto')
def run_auto():
    """

    :return:
    """
    return render_template('run_auto.html')


@client_blueprint.route('/schedule_test')
def schedule_test():
    """

    :return:
    """
    return render_template('schedule_test.html')


@client_blueprint.route('/tools')
def tools():
    return render_template('tools.html')


@client_blueprint.route('/instanceHandler')
def instance_handler():
    """

    :return:
    """
    return render_template('instanceHandler.html')


@client_blueprint.route('/perfTest')
def perfTest():
    """

    :return:
    """
    return render_template('perfTest.html')