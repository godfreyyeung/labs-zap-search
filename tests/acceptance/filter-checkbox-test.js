import { module, test, skip } from 'qunit';
import { visit, currentURL, click, fillIn, find } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | filter checkbox', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('User clicks first project status and it filters', async function(assert) {
    server.createList('project', 20);
    await visit('/');
    await click('.stage-checkbox li:first-child a');

    assert.equal(currentURL().includes('Complete%2CIn%20Public%20Review'), true);
  });

  test('User clicks first CEQR Status and it filters', async function(assert) {
    server.createList('project', 20);
    await visit('/');
    await click('.CEQR-checkbox li:first-child a');

    assert.equal(currentURL().includes('Type%20I%2CType%20II%2CUnknown'), true);
  });

  test('User clicks first FEMA Flood Zone status and it filters', async function(assert) {
    server.createList('project', 20);
    await visit('/');
    await click('.FEMA-checkbox li:first-child a');

    assert.equal(currentURL().includes('dcp_femafloodzonev=true'), true);
  });

  test('User clicks first ULURP status and it filters', async function(assert) {
    server.createList('project', 20);
    await visit('/');
    await click('.ULURP-checkbox li:first-child a');

    assert.equal(currentURL().includes('dcp_ulurp_nonulurp=Non-ULURP'), true);
  });

  test('User clicks community district box, fills in community district name, selects CD', async function(assert) {
    server.createList('project', 20);
    await visit('/');
    await click('.filter-section-community-district .ember-power-select-multiple-options');
    await fillIn('.filter-section-community-district .ember-power-select-multiple-options input', 'Brooklyn 1');
    await click ('.ember-power-select-options li:first-child');

    assert.equal(currentURL(), '/projects?community-districts=BK01');
  });

  skip('Page reloads (pagination reset) when click new filter', async function(assert) {
    server.createList('project', 20);
    await visit('/projects');
    await click('.stage-checkbox li:first-child a');

    assert.equal(currentURL(), '/projects');
  });

  skip('Reset filters button works', async function(assert) {
    server.createList('project', 20);
    await visit('/projects');
    await click('.ULURP-checkbox li:first-child a');
    await click('.ember-power-select-multiple-options');
    await fillIn('.ember-power-select-multiple-options input', 'Brooklyn 1');
    await click('.ember-power-select-options li:first-child');
    await click('.projects-reset-filters-button');

    assert.equal(currentURL(), '/projects');
  });

  test('Landing on QP default leads to cleaned URL', async function(assert) {
    server.createList('project', 20);
    await visit('/projects');
    await click('.stage-checkbox li:nth-child(1)');
    await click('.stage-checkbox li:nth-child(2)');
    await click('.stage-checkbox li:nth-child(3)');
    await click('.stage-checkbox li:nth-child(3)');
    await click('.stage-checkbox li:nth-child(2)');
    await click('.stage-checkbox li:nth-child(1)');

    assert.equal(currentURL(), '/projects');
  });

  test('User can click on filter switches with updated state', async function(assert) {
    server.createList('project', 20);
    await visit('/projects');
    await click('.filter-section-fema-flood-zone .switch-paddle');

    assert.equal(currentURL(), '/projects?applied-filters=action-types%2Ccommunity-districts%2Cdcp_femafloodzonea%2Cdcp_femafloodzonecoastala%2Cdcp_femafloodzoneshadedx%2Cdcp_femafloodzonev%2Cdcp_publicstatus');
    await click('.filter-section-fema-flood-zone .switch-paddle');

    assert.equal(currentURL(), '/projects');
  });

  test('Clicking unapplied filter enables it', async function(assert) {
    server.createList('project', 20);

    await visit('/projects');
    await find('.filter-section-project-name-\\/-description-\\/-applicant.inactive');
    await fillIn('.filter-section-project-name-\\/-description-\\/-applicant .filter-text-input', 'peanut butter');
    await find('.filter-section-project-name-\\/-description-\\/-applicant.active');

    assert.equal(currentURL().includes('project_applicant_text'), true);
    assert.equal(currentURL().includes('applied-filters'), true);

    await find('.filter-section-borough.inactive');
    await click('.filter-section-borough li:nth-child(1)');
    await click('.filter-section-borough li:nth-child(2)');
    await click('.filter-section-borough li:nth-child(3)');
    await find('.filter-section-borough.active');

    assert.equal(currentURL().includes('boroughs=Bronx%2CCitywide%2CManhattan'), true);

    await click('.filter-section-fema-flood-zone .FEMA-checkbox li:first-child a');
    await find('.filter-section-fema-flood-zone.active');
    assert.equal(currentURL().includes('dcp_femafloodzonev=true'), true);
  });
});
