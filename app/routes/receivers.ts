import { get } from '@ember/object';
import Route from '@ember/routing/route';
import { underscore } from '@ember/string';
import { isPresent } from '@ember/utils';
import RSVP from 'rsvp';

export default class ReceiversRoute extends Route {
  public queryParams = {
    ein: { refreshModel: true, replace: true },
    name: { refreshModel: true, replace: true },
    state: { refreshModel: true, replace: true },
    page: { refreshModel: true, replace: true },
    perPage: { refreshModel: true, replace: true }
  };

  public async model(params: any) {
    const cleanParams: any = this.sanitizeParams(params);
    const receivers: any = await this.getReceivers(cleanParams);
    return RSVP.hash({
      receivers: receivers.data,
      meta: { totalCount: receivers.total_count, totalPages: receivers.total_pages }
    });
  }

  private sanitizeParams(params: any) {
    return Object.keys(params).reduce((newParams: any, key: any) => {
      const value = params[key];
      if (isPresent(value)) {
        newParams[underscore(key)] = value.toString();
        return newParams;
      } else {
        return newParams;
      }
    }, {});
  }

  private getReceivers(params: any) {
    const queryUrl = Object.keys(params).reduce((url: string, param: any) => {
      const paramValue = get(params, param);
      const requestKey = underscore(param);
      return url += paramValue ? `&${requestKey}=${paramValue}` : '';
    }, '');
    return fetch(`http://localhost:3000/receivers?${queryUrl}`)
      .then((response: any) => response.json())
      .then(data => data);
  }
}
