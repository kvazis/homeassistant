console.info(`%c TEMPOMETER-CARD \n%c      v1.3       `, 'color: orange; font-weight: bold; background: black', 'color: white; font-weight: bold; background: dimgray');
class TempometerGaugeCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  setConfig(config) {
    if (!config.entity) {
      throw new Error('Please define an entity');
    }
	if (config.max == null) {
		throw new Error('Please define the max config option');
	}
	if (config.min == null) {
		throw new Error('Please define the min config option');
	}

    const root = this.shadowRoot;
    if (root.lastChild) root.removeChild(root.lastChild);

    const cardConfig = Object.assign({}, config);
    if (!cardConfig.scale) cardConfig.scale = "50px";

    if (config.horizontal) {
      cardConfig.scale = "40px";
    }
    
    const entityParts = this._splitEntityAndAttribute(cardConfig.entity);
    cardConfig.entity = entityParts.entity;
    if (entityParts.attribute) cardConfig.attribute = entityParts.attribute;

    if (cardConfig.entity_min !== undefined) {
      const entityMinParts = this._splitEntityAndAttribute(cardConfig.entity_min);
      cardConfig.entity_min = entityMinParts.entity;
      if (entityMinParts.attribute) cardConfig.minAttribute = entityMinParts.attribute;
    }

    if (cardConfig.entity_max !== undefined) {
      const entityMaxParts = this._splitEntityAndAttribute(cardConfig.entity_max);
      cardConfig.entity_max = entityMaxParts.entity;
      if (entityMaxParts.attribute) cardConfig.maxAttribute = entityMaxParts.attribute;
    }
	    
    let card_style = cardConfig.style;
    const card = document.createElement('ha-card');
    const content = document.createElement('div');
    const style = document.createElement('style');

    style.textContent = `
      ha-card {
        --base-unit: ${cardConfig.scale};
        height: calc(var(--base-unit)*3.5);
        position: relative;
      }
      .container{
        width: calc(var(--base-unit) * 4);
        height: calc(var(--base-unit) * 2.44);
        position: absolute;
        top: calc(var(--base-unit)*2.1);
        left: 50%;
        overflow: hidden;
        text-align: center;
        transform: translate(-50%, -50%);
      }
      .gauge-a{
        z-index: 1;
        position: absolute;
        background-color: var(--secondary-background-color);
        width: calc(var(--base-unit) * 4);
        height: calc(var(--base-unit) * 2);
        top: 0%;
        border-radius:calc(var(--base-unit) * 2.5) calc(var(--base-unit) * 2.5) 0px 0px ;
      }
      .gauge-b{
        z-index: 3;
        position: absolute;
        background-color: var(--card-background-color);
        width: calc(var(--base-unit) * 3.6);
        height: calc(var(--base-unit) * 2);
        top: calc(var(--base-unit) * 0.2);
        margin-left: calc(var(--base-unit) * 0.2);
        margin-right: auto;
        border-radius: calc(var(--base-unit) * 3.6) calc(var(--base-unit) * 3.6) 0px 0px ;
      }
      .gauge-c{
        z-index: 2;
        position: absolute;
        background-color: var(--label-badge-yellow);
        width: calc(var(--base-unit) * 4);
        height: calc(var(--base-unit) * 2);
        top: calc(var(--base-unit) * 2);
        margin-left: auto;
        margin-right: auto;
        border-radius: 0px 0px calc(var(--base-unit) * 2) calc(var(--base-unit) * 2) ;
        transform-origin: center top;
        transition: all 1.3s ease-in-out;
      }
      .gauge-data{
        z-index: 4;
        color: var(--primary-text-color);
        line-height: calc(var(--base-unit) * 0.3);
        position: absolute;
        width: calc(var(--base-unit) * 4);
        height: calc(var(--base-unit) * 2.1);
        top: calc(var(--base-unit) * 1.25);
        margin-left: auto;
        margin-right: auto;
        transition: all 1s ease-out;
      }
      .gauge-data #percent{
        font-size: calc(var(--base-unit) * 0.55);
      }
      .gauge-data #title{
        padding-top: calc(var(--base-unit) * 0.15);
        font-size: calc(var(--base-unit) * 0.30);
      }
      .gauge-icons{
            width: calc(var(--base-unit) * 4);
            height: calc(var(--base-unit) * 2.5);
            text-align: center;
            margin: 0 auto;
            padding-top: calc(var(--base-unit)*0.15);
        }
      .icon1{
            width: 18px;
            height: 18px;
            color: var(--paper-item-icon-color);
            float: left;
            padding-top: 3em;
        }
      .icon2{
            width: 18px;
            height: 18px;
            color: var(--paper-item-icon-color);
            padding-top: .5em;
            padding-right: 9px;
        }
      .icon3{
            width: 18px;
            height: 18px;
            color: var(--paper-item-icon-color);
            float: right;
            padding-top: 3em;
        }
      .gauge-footer{
            position: absolute;
            width: calc(var(--base-unit) *4);
            height: calc(var(--base-unit) *.75);
            top: calc(var(--base-unit) *2);
            z-index: 4;
            font-size: calc(var(--base-unit) * 0.30);
            font-weight: 400;
            padding-top: .25em;
            background: var(--card-background-color);
        }
      .gauge-footer .minval{
            float: left;
            color: #797575;
            padding-left: .5em;
        }
      .gauge-footer .maxval{
            float: right;
            color: #797575;
            padding-right: .25em;
        }
      .gauge-c hr {
            visibility: hidden;
        }
      .gauge-d{
        z-index: 100;
        position: absolute;
        width: calc(var(--base-unit) * 4);
        height: 0;
        top: calc(var(--base-unit) * 2);
        margin-left: auto;
        margin-right: auto;
        border-radius: 0px 0px calc(var(--base-unit) * 2) calc(var(--base-unit) * 2) ;
        transform-origin: center top;
        transition: all 1.3s ease-in-out;
        transform: rotate(45deg);
      }
      .gauge-e{
        z-index: 101;
        position: absolute;
        width: calc(var(--base-unit) * 4);
        height: 0;
        top: calc(var(--base-unit) * 2);
        margin-left: auto;
        margin-right: auto;
        border-radius: 0px 0px calc(var(--base-unit) * 2) calc(var(--base-unit) * 2) ;
        transform-origin: center top;
        transition: all 1.3s ease-in-out;
        transform: rotate(125deg);
      }
    `;
    content.innerHTML = `
    <div id="gauge-icons" class="gauge-icons" style="display: none;">
        <ha-icon class="icon1" icon="${cardConfig.icon1}"></ha-icon>
        <ha-icon class="icon2" icon="${cardConfig.icon2}"></ha-icon>
        <ha-icon class="icon3" icon="${cardConfig.icon3}"></ha-icon>
    </div>
    <div id="gauge-icons-baro" class="gauge-icons">
        <ha-icon class="icon1" icon=mdi:weather-pouring></ha-icon>
        <ha-icon class="icon2" icon=mdi:weather-partly-cloudy></ha-icon>
        <ha-icon class="icon3" icon=mdi:weather-sunny></ha-icon>
    </div>
    <div id="gauge-icons-thermo" class="gauge-icons" style="display: none;">
        <ha-icon class="icon1" icon=mdi:thermometer-low></ha-icon>
        <ha-icon class="icon2" icon=mdi:thermometer></ha-icon>
        <ha-icon class="icon3" icon=mdi:thermometer-high></ha-icon>
    </div>
    <div id="gauge-icons-water" class="gauge-icons" style="display: none;">
        <ha-icon class="icon1" icon=mdi:water-off></ha-icon>
        <ha-icon class="icon2" icon=mdi:water-percent></ha-icon>
        <ha-icon class="icon3" icon=mdi:water></ha-icon>
    </div>
    <div class="container">
        <div class="gauge-a">
        </div>
        <div class="gauge-b"></div>
        <div class="gauge-c" id="gauge"></div>
        <div class="gauge-d" id="recentMin">
            <svg id="svg_min" style="margin-right: 90%; width: 18px;height: 18px; margin-top: -6px; padding-bottom: 10px" viewBox="0 0 24 24">
                <title id="svg_min_title"></title>
                <path fill="blue" d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" />
	    </svg>
        </div>
        <div class="gauge-e" id="recentMax">
            <svg id="svg_max" style="margin-right: 90%; width: 18px;height: 18px; margin-top: -12px; padding-bottom:10px;" viewBox="0 0 24 24">
                <title id="svg_max_title"></title>
                <path fill="red" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
            </svg>
        </div>
        <div class="gauge-data">
            <div id="percent"></div>
            <div id="title"></div>
        </div>
        <div class="gauge-footer">
            <span id="minval" class="minval"></span>
            <span id="maxval" class="maxval"></span>
        </div>
      </div>
    `;
    card.appendChild(content);
    card.appendChild(style);
    card.addEventListener('click', event => {
      this._fire('hass-more-info', { entityId: cardConfig.entity });
    });
    root.appendChild(card);
    this._config = cardConfig;
	
	if (card_style == "thermometer") {
		root.getElementById("gauge-icons-baro").style.display = 'none';
		root.getElementById("gauge-icons-water").style.display = 'none';
		root.getElementById("gauge-icons-thermo").style.display = 'block';
		root.getElementById("gauge-icons").style.display = 'none';
	} else if (card_style == "humidity") {
		root.getElementById("gauge-icons-baro").style.display = 'none';
		root.getElementById("gauge-icons-water").style.display = 'block';
		root.getElementById("gauge-icons-thermo").style.display = 'none';
		root.getElementById("gauge-icons").style.display = 'none';
	} else if (card_style == "custom") {
	    root.getElementById("gauge-icons-baro").style.display = 'none';
		root.getElementById("gauge-icons-water").style.display = 'none';
		root.getElementById("gauge-icons-thermo").style.display = 'none';
		root.getElementById("gauge-icons").style.display = 'block';
	}
  }

  _splitEntityAndAttribute(entity) {
      let parts = entity.split('.');
      if (parts.length < 3) {
          return { entity: entity };
      }

      return { attribute: parts.pop(), entity: parts.join('.') };
  }

  _fire(type, detail, options) {
    const node = this.shadowRoot;
    options = options || {};
    detail = (detail === null || detail === undefined) ? {} : detail;
    const event = new Event(type, {
      bubbles: options.bubbles === undefined ? true : options.bubbles,
      cancelable: Boolean(options.cancelable),
      composed: options.composed === undefined ? true : options.composed
    });
    event.detail = detail;
    node.dispatchEvent(event);
    return event;
  }

  _translateTurn(value, config) {
    return 5 * (value - config.min) / (config.max - config.min);
  }

  _computeSeverity(stateValue, sections) {
    let numberValue = Number(stateValue);
    const severityMap = {
      red: "var(--label-badge-red)",
      green: "var(--label-badge-green)",
      yellow: "var(--label-badge-yellow)",
      normal: "var(--label-badge-blue)",
    };
    if (!sections) return severityMap["normal"];
    let sortable = [];
    for (let severity in sections) {
      sortable.push([severity, sections[severity]]);
    }
    sortable.sort((a, b) => { return a[1] - b[1] });
    if (numberValue >= sortable[0][1] && numberValue < sortable[1][1]) {
      return severityMap[sortable[0][0]];
    }
    if (numberValue >= sortable[1][1] && numberValue < sortable[2][1]) {
      return severityMap[sortable[1][0]];
    }
    if (sortable.length === 4) {
      if (numberValue >= sortable[2][1] && numberValue < sortable[3][1]) {
        return severityMap[sortable[2][0]];
      }
      if (numberValue > sortable[3][1]) {
        return severityMap["normal"]
      }
    } else {
      if (numberValue >= sortable[2][1]) {
        return severityMap[sortable[2][0]];
      }
    }
    return severityMap["normal"];
  }

  _getEntityStateValue(entity, attribute) {
    if (!attribute) {
      return entity.state;
    }

    return entity.attributes[attribute];
  }

  set hass(hass) {
    const root = this.shadowRoot;
    const config = this._config;
    var entityState = this._getEntityStateValue(hass.states[config.entity], config.attribute);
    var maxEntityState = null;
    var minEntityState = null;
    if (config.entity_max !== undefined) {
        maxEntityState = this._getEntityStateValue(hass.states[config.entity_max], config.maxAttribute);
    } else {
        root.getElementById("recentMax").style.display = 'none';
    }
    if (config.entity_min !== undefined) {
        minEntityState = this._getEntityStateValue(hass.states[config.entity_min], config.minAttribute);
    } else {
        root.getElementById("recentMin").style.display = 'none';
    }

    let measurement = "";
    if (config.measurement == null) {
      if (hass.states[config.entity].attributes.unit_of_measurement === undefined) {
        measurement = '';
      } else {
        measurement = hass.states[config.entity].attributes.unit_of_measurement;
      }
    } else {
      measurement = config.measurement;
    }

	root.getElementById("minval").innerHTML = config.min;
	root.getElementById("maxval").innerHTML = config.max;
    
  // Set decimal precision
  if (config.decimals !== undefined) {
      // Only allow positive numbers
      if (config.decimals >= 0) {
        entityState = Math.round(parseFloat(entityState) * (10 ** config.decimals)) / (10 ** config.decimals)   // Round (https://stackoverflow.com/a/11832950)
        entityState = entityState.toFixed(config.decimals)  // Add trailing zeroes if applicable        
      }
  }

	if (entityState !== this._entityState) {
      root.getElementById("percent").textContent = `${entityState} ${measurement}`;
      root.getElementById("title").textContent = config.title;
      const turn = this._translateTurn(entityState, config) / 10;
      root.getElementById("gauge").style.transform = `rotate(${turn}turn)`;
      root.getElementById("gauge").style.backgroundColor = this._computeSeverity(entityState, config.severity);
      this._entityState = entityState;
    }
	if (config.entity_max !== null) {
	    if (maxEntityState !== this._maxEntityState) {
		    this._maxEntityState = maxEntityState;
		    const turn3 = this._translateTurn(maxEntityState, config) /10;  
		    root.getElementById("recentMax").style.transform = `rotate(${turn3}turn)`;
		    root.getElementById("svg_max_title").innerHTML = maxEntityState;
	    }
	}
	if (config.entity_min !== null) {
	    if (minEntityState !== this._minEntityState) {
		    this._minEntityState = minEntityState;
		    const turn2 = this._translateTurn(minEntityState, config) /10;
            root.getElementById("recentMin").style.transform = `rotate(${turn2}turn)`;
		    root.getElementById("svg_min_title").innerHTML = minEntityState;
	    } 
	}
    root.lastChild.hass = hass;
  }

  getCardSize() {
    return 1;
  }
}

customElements.define('tempometer-gauge-card', TempometerGaugeCard);
