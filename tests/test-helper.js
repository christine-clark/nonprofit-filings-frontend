import { setApplication } from '@ember/test-helpers';
import Application from '../app';
import config from '../app/config/environment';
import { start } from 'ember-qunit';
import * as QUnit from 'qunit';
import { setup } from 'qunit-dom';

const application = Application.create(config.APP);
setApplication(application);
setup(QUnit.assert);
start();
