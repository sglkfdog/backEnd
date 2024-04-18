import { usePermission } from "core/settings";

/**
 * @description Support .and directive modifiers
 * @usage
 *    <element v-permission="sys/user/add" />
 *    <element v-permission.and="['sys/user/add']" />
 */
const directive = {
  mounted: (el, binding) => {
    const { hasPermission } = usePermission();

    const { value, modifiers } = binding;

    // and or to compare
    let nor = "or";
    if (modifiers.and) {
      nor = "and";
    }

    if (!hasPermission(value, nor)) {
      el.parentNode?.removeChild(el);
    }
  },
};
export function setupPermissionDirective(app) {
  app.directive("permission", directive);
}
export function setupGlobalDirectives(app) {
  setupPermissionDirective(app);
}
