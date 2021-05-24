export class InvalidParamError extends Error {
  public readonly name = 'InvalidParamError';

  constructor(invalidParamName: string, allowedTypes: string) {
    super(
      `Only ${allowedTypes} are allowed into "${invalidParamName}" parameter`
    );
  }
}
