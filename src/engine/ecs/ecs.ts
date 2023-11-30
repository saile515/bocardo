import Component from "./component.ts";
import Entity from "./entity.ts";

// Entity Component System
export default class ECS {
    private _entities: Entity[] = [];
    private _components: { [key: string]: Component[] } = {};

    private add_component(instance: Component) {
        const class_name = instance.constructor.name;

        if (!this._components[class_name]) {
            this._components[class_name] = [];
        }

        this._components[class_name].push(instance);
    }

    create_entity(components: Component[]) {
        const entity = new Entity();

        components.forEach((component) => {
            component.set_parent(entity);
            this.add_component(component);
        });

        this._entities.push(entity);
    }
}
