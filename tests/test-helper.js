import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';
import Application from 'nonprofit-filings-frontend/app';
import config from 'nonprofit-filings-frontend/config/environment';
import * as QUnit from 'qunit';
import { setup } from 'qunit-dom';

const application = Application.create(config.APP);
setApplication(application);
setup(QUnit.assert);
start();
