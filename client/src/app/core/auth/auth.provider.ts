import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { UsuarioService } from "./services/usuario.service";

export const provideAutentication = (): EnvironmentProviders => {
  return makeEnvironmentProviders([AuthService, UsuarioService]);
};
