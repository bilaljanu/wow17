package java.nio.file.attribute;

import java.io.IOException;
import java.nio.file.Path;

public interface UserPrincipalLookupService {
    UserPrincipal lookupPrincipalByName(String name) throws IOException;
    UserPrincipal lookupPrincipalByGroupName(String group) throws IOException;
}
