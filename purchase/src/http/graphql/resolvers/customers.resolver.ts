import { UseGuards } from '@nestjs/common';
import { Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { CustomerServices } from 'src/services/customers.service';
import { PurchaseService } from 'src/services/purchases.service';
import { Customer } from '../models/customer';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(
    private customersService: CustomerServices,
    private purchasesServices: PurchaseService,
  ) {}

  @UseGuards(AuthorizationGuard)
  @Query(() => Customer)
  me(@CurrentUser() user: AuthUser) {
    return this.customersService.getCustomerByAuthUserId(user.sub);
  }

  @UseGuards(AuthorizationGuard)
  @Query(() => Customer)
  purchases(@CurrentUser() customer: Customer) {
    return this.purchasesServices.listAllFromCustomer(customer.id);
  }

  @ResolveReference()
  resolveReference(reference: { authUserId: string }) {
    return this.customersService.getCustomerByAuthUserId(reference.authUserId);
  }
}
