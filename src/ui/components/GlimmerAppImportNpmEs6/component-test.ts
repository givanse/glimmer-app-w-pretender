import hbs from '@glimmer/inline-precompile';
import { render, setupRenderingTest } from '@glimmer/test-helpers';
import Pretender, {FakeXMLHttpRequest, ResponseHandler, SetupCallback} from 'pretender';

/**
 *
 * @param status HTTP response status code
 * @param payload
 */
function json(status: number, payload: any): ResponseHandler {
  return function(request: FakeXMLHttpRequest) {
    const data = {photo: `${payload} ${request.params.id}`};
    return [status, { 'Content-Type': 'text/json' }, JSON.stringify(data)];
  };
}

const setup: SetupCallback = function() {
  this.get('/api/v1/photos/:id', json(200, 'photo: '));
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
  });
});
