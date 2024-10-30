import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { VisualizarDespesaViewModel } from "../models/despesa.models";
import { inject } from "@angular/core";
import { DespesaService } from "./despesa.service";

export const visualizarDespesaResolver: ResolveFn<VisualizarDespesaViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  const id = route.params['id'];

  return inject(DespesaService).selecionarPorId(id);
};
