import hbs from '@glimmer/inline-precompile';
import { render, setupRenderingTest } from '@glimmer/test-helpers';
import Pretender, {FakeXMLHttpRequest, ResponseHandler, SetupCallback} from 'pretender';

const setup: SetupCallback = function() {
  this.get('/api/v1/photos/:id', function(request) {
    const data = {src: `photo-${request.params.id}.jpg`};
    return [status, { 'Content-Type': 'text/json' }, JSON.stringify(data)];
  });
};

const server = new Pretender(setup);

const { module, test } = QUnit;

module('Component: GlimmerAppImportNpmEs6', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<GlimmerAppImportNpmEs6 />`);
    assert.equal(this.containerElement.textContent, 'Welcome to Glimmer!\n');

    const response = await fetch('/api/v1/photos/300');
    assert.equal(response.status, 200);
    const data = await response.json();
    assert.equal(data.src, 'photo-300.jpg');
  });
});
